import {useState} from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVerificationScreen() {
  const [idPhoto, setIdPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [licensePhoto, setLicensePhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [selfie, setSelfie] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async (
    setImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!idPhoto || !licensePhoto || !selfie) {
      Alert.alert('Error', 'Please upload all three documents.');
      return;
    }

    const formData = new FormData();

    formData.append('files', {
      uri: idPhoto.uri,
      name: 'id.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('files', {
      uri: licensePhoto.uri,
      name: 'license.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('files', {
      uri: selfie.uri,
      name: 'selfie.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch(`${API_URL}/drivers/upload-verification`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Documents uploaded successfully. We will review them shortly.');
      } else {
        Alert.alert('Upload Failed', result.detail || 'An error occurred.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Could not connect to the server. Make sure the API_URL is correct.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Verification</Text>
      <Text style={styles.subtitle}>Upload the required documents to get verified.</Text>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>1. Government ID</Text>
        <Button title="Choose ID Photo" onPress={() => pickImage(setIdPhoto)} />
        {idPhoto && <Image source={{ uri: idPhoto.uri }} style={styles.preview} />}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>2. Driving License</Text>
        <Button title="Choose License Photo" onPress={() => pickImage(setLicensePhoto)} />
        {licensePhoto && <Image source={{ uri: licensePhoto.uri }} style={styles.preview} />}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>3. Your Selfie</Text>
        <Button title="Choose Selfie" onPress={() => pickImage(setSelfie)} />
        {selfie && <Image source={{ uri: selfie.uri }} style={styles.preview} />}
      </View>

      <Button title="Submit for Verification" onPress={handleSubmit} disabled={!idPhoto || !licensePhoto || !selfie} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 32,
        textAlign: 'center',
    },
    uploadSection: {
        marginBottom: 24,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    preview: {
        width: 120,
        height: 120,
        marginTop: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        resizeMode: 'contain',
    },
});