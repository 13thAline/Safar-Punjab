import {useState} from 'react';
import { View, Text, Button, Image, Alert, ScrollView, TextInput,Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVerificationScreen() {

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;
  const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;

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

 return(
  <ScrollView style={{ flex: 1, backgroundColor: "#FCF5E3",padding: "4%"}}>
  <View
    style={{
      height: 152,
      backgroundColor: "#FFB703",
      borderBottomLeftRadius: 56,
      borderBottomRightRadius: 56,
    }}
  >
    <Image source={require("../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")} style={{ width: LOGO_SIZE, height: LOGO_SIZE, position: "absolute", top: 20, left: logoLeftCentered, borderRadius: LOGO_RADIUS, }} /> 
    </View>

  <View
          style={{
            height: 60,
            width: CARD_WIDTH,
            marginTop: -30,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            alignSelf: "center",
            elevation: 15
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: 25,
              lineHeight: 33,
              color: "#045633",
            }}
          >
            Driver & Vehicle Verification
          </Text>
        </View>

        <View style={{
          marginTop: 20,
          alignItems: 'center', 
          width: '100%',
          backgroundColor:"#DFE5C6",
          borderRadius: 20,
          padding: "5%"
            }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            marginBottom: 8,
            color: "#500B14"
          }}
            >Bus Registration Number</Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: '#045633',
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 8,
              width: '80%',
              textAlign: 'center',
              fontSize: 16,
          }}
            placeholder="e.g., OD02AB1234"
          placeholderTextColor="#757575F0"
            value={regNumber}
            onChangeText={setRegNumber}
          />

          <View style={{ 
            marginTop:"4%",
            marginBottom: "4%", 
            alignItems: 'center', 
            width: '100%' 
            }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            marginBottom: 10,
            color: "#500B14"
          }}>
            Vehicle RC (Registration Certificate)</Text>
          <TouchableOpacity onPress={() => pickImage(setRcPhoto)} >
            <Text style={{ 
              color: "white",
              fontWeight: 500,
              fontSize:20,
              backgroundColor:"#045633",
              borderRadius:8,
              padding: "3%"
              }}>Choose RC Photo</Text>
          </TouchableOpacity>
          {rcPhoto && <Image source={{ uri: rcPhoto.uri }} style={{ width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' }} 
          />}
          </View>

          <View style={{ 
            marginBottom: "4%", 
            alignItems: 'center', 
            width: '100%' 
            }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            marginBottom: 10,
            color: "#500B14"
          }}>
            Government ID</Text>
          <TouchableOpacity onPress={() => pickImage(setIdPhoto)} >
            <Text style={{ 
              color: "white",
              fontWeight: 500,
              fontSize:20,
              backgroundColor:"#045633",
              borderRadius:8,
              padding: "3%"
              }}>Choose ID Photo</Text>
          </TouchableOpacity>
          {idPhoto && <Image source={{ uri: idPhoto.uri }} style={{ width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' }} />}
          </View>

          <View style={{ 
            marginBottom: "4%", 
            alignItems: 'center', 
            width: '100%' 
            }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            marginBottom: 10,
            color: "#500B14"
          }}>
            Driving License</Text>
          <TouchableOpacity onPress={() => pickImage(setLicensePhoto)} >
            <Text style={{ 
              color: "white",
              fontWeight: 500,
              fontSize:20,
              backgroundColor:"#045633",
              borderRadius:8,
              padding: "3%"
              }}>Choose License Photo</Text>
          </TouchableOpacity>
          {licensePhoto && <Image source={{ uri: licensePhoto.uri }} style={{ width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' }}/>}
          </View>

          <View style={{ 
            marginBottom: "4%", 
            alignItems: 'center', 
            width: '100%' 
            }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            marginBottom: 10,
            color: "#500B14"
          }}>
            Your Selfie</Text>
          <TouchableOpacity onPress={() => pickImage(setSelfie)} >
            <Text style={{ 
              color: "white",
              fontWeight: 500,
              fontSize:20,
              backgroundColor:"#045633",
              borderRadius:8,
              padding: "3%"
              }}>Choose Selfie</Text>
          </TouchableOpacity>
           {selfie && <Image source={{ uri: selfie.uri }} style={{ width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' }}/>}
          </View>

        </View>
        {/* Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" ,marginTop:"5%",padding:"1%" }}>
        <TouchableOpacity style={{ borderWidth: 3, borderColor: "#757575F0", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,width:"45%",alignItems:"center" }}>
          <Text style={{ color: "#D7263D",fontWeight: 500,fontSize:20 }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={handleSubmit}
        style={{ backgroundColor: "#500B14", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,width:"45%",alignItems:"center" }}>
          <Text style={{ color: "white",fontWeight: 500,fontSize:20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
 )};

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Driver & Vehicle Verification</Text>
      
//       <View style={styles.uploadSection}>
//         <Text style={styles.label}>Bus Registration Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g., OD02AB1234"
//           value={regNumber}
//           onChangeText={setRegNumber}
//         />
//       </View>
      
//       <View style={styles.uploadSection}>
//         <Text style={styles.label}>1. Vehicle RC (Registration Certificate)</Text>
//         <Button title="Choose RC Photo" onPress={() => pickImage(setRcPhoto)} />
//         {rcPhoto && <Image source={{ uri: rcPhoto.uri }} style={styles.preview} />}
//       </View>

      // <View style={styles.uploadSection}>
      //   <Text style={styles.label}>2. Government ID</Text>
      //   <Button title="Choose ID Photo" onPress={() => pickImage(setIdPhoto)} />
      //   {idPhoto && <Image source={{ uri: idPhoto.uri }} style={styles.preview} />}
      // </View>

//       <View style={styles.uploadSection}>
//         <Text style={styles.label}>3. Driving License</Text>
//         <Button title="Choose License Photo" onPress={() => pickImage(setLicensePhoto)} />
//         {licensePhoto && <Image source={{ uri: licensePhoto.uri }} style={styles.preview} />}
//       </View>

//       <View style={styles.uploadSection}>
//         <Text style={styles.label}>4. Your Selfie</Text>
//         <Button title="Choose Selfie" onPress={() => pickImage(setSelfie)} />
//         {selfie && <Image source={{ uri: selfie.uri }} style={styles.preview} />}
//       </View>

//       <Button title="Submit for Verification" onPress={handleSubmit} />
//     </ScrollView>
//   );
// }

// --- CHANGE: The container style is now more flexible ---
// const styles = StyleSheet.create({
//     container: {
//         // Use padding instead of flex: 1 for scroll views
//         padding: 24,
//         paddingBottom: 60, // Add extra padding at the bottom
//         backgroundColor: '#f5f5f5',
//         alignItems: 'center', // Center the content
//     },
//     title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
//     uploadSection: { marginBottom: 16, alignItems: 'center', width: '100%' },
//     label: { fontSize: 18, fontWeight: '500', marginBottom: 8 },
//     preview: { width: 120, height: 90, marginTop: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', resizeMode: 'cover' },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 8,
//         width: '80%',
//         textAlign: 'center',
//         fontSize: 16,
//     }
// });