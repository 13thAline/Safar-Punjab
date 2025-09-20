// frontend/app/driver-verification.tsx
import {useState} from 'react';
// Import ScrollView and TextInput
import { View, Text, Button, Image, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVerificationScreen() {
  const [idPhoto, setIdPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [licensePhoto, setLicensePhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [selfie, setSelfie] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [rcPhoto, setRcPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [regNumber, setRegNumber] = useState('');

  const pickImage = async (
    setImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!idPhoto || !licensePhoto || !selfie || !rcPhoto || !regNumber) {
      Alert.alert('Error', 'Please fill all fields and upload all four documents.');
      return;
    }

    const formData = new FormData();
    formData.append('registration_number', regNumber);
    formData.append('files', { uri: idPhoto.uri, name: 'id.jpg', type: 'image/jpeg' } as any);
    formData.append('files', { uri: licensePhoto.uri, name: 'license.jpg', type: 'image/jpeg' } as any);
    formData.append('files', { uri: selfie.uri, name: 'selfie.jpg', type: 'image/jpeg' } as any);
    formData.append('files', { uri: rcPhoto.uri, name: 'rc.jpg', type: 'image/jpeg' } as any);


    try {
      const response = await fetch(`${API_URL}/drivers/upload-verification`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Documents uploaded successfully for review.');
      } else {
        Alert.alert('Upload Failed', result.detail || 'An error occurred.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  // --- CHANGE: Use ScrollView as the main container ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Driver & Vehicle Verification</Text>
      
      <View style={styles.uploadSection}>
        <Text style={styles.label}>Bus Registration Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., OD02AB1234"
          value={regNumber}
          onChangeText={setRegNumber}
        />
      </View>
      
      <View style={styles.uploadSection}>
        <Text style={styles.label}>1. Vehicle RC (Registration Certificate)</Text>
        <Button title="Choose RC Photo" onPress={() => pickImage(setRcPhoto)} />
        {rcPhoto && <Image source={{ uri: rcPhoto.uri }} style={styles.preview} />}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>2. Government ID</Text>
        <Button title="Choose ID Photo" onPress={() => pickImage(setIdPhoto)} />
        {idPhoto && <Image source={{ uri: idPhoto.uri }} style={styles.preview} />}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>3. Driving License</Text>
        <Button title="Choose License Photo" onPress={() => pickImage(setLicensePhoto)} />
        {licensePhoto && <Image source={{ uri: licensePhoto.uri }} style={styles.preview} />}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>4. Your Selfie</Text>
        <Button title="Choose Selfie" onPress={() => pickImage(setSelfie)} />
        {selfie && <Image source={{ uri: selfie.uri }} style={styles.preview} />}
      </View>

      <Button title="Submit for Verification" onPress={handleSubmit} />
    </ScrollView>
  );
}

// --- CHANGE: The container style is now more flexible ---
const styles = StyleSheet.create({
    container: {
        // Use padding instead of flex: 1 for scroll views
        padding: 24,
        paddingBottom: 60, // Add extra padding at the bottom
        backgroundColor: '#f5f5f5',
        alignItems: 'center', // Center the content
    },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    uploadSection: { marginBottom: 16, alignItems: 'center', width: '100%' },
    label: { fontSize: 18, fontWeight: '500', marginBottom: 8 },
    preview: { width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        width: '80%',
        textAlign: 'center',
        fontSize: 16,
    }
});