import { useState } from "react";
import { View, Text, Image, Alert, ScrollView, TextInput, Dimensions, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";  // ✅ Import router


const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVerificationScreen() {
  const router = useRouter(); // ✅ Initialize router

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  const [idPhoto, setIdPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [licensePhoto, setLicensePhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [selfie, setSelfie] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [rcPhoto, setRcPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [regNumber, setRegNumber] = useState("");

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
      Alert.alert("Error", "Please fill all fields and upload all four documents.");
      return;
    }

    const formData = new FormData();
    formData.append("registration_number", regNumber);
    formData.append("files", { uri: idPhoto.uri, name: "id.jpg", type: "image/jpeg" } as any);
    formData.append("files", { uri: licensePhoto.uri, name: "license.jpg", type: "image/jpeg" } as any);
    formData.append("files", { uri: selfie.uri, name: "selfie.jpg", type: "image/jpeg" } as any);
    formData.append("files", { uri: rcPhoto.uri, name: "rc.jpg", type: "image/jpeg" } as any);

    try {
      const response = await fetch(`${API_URL}/drivers/upload-verification`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Documents uploaded successfully for review.", [
          {
            text: "OK",
            onPress: () => router.push("/welcome"), // ✅ Navigate after success
          },
        ]);
      } else {
        Alert.alert("Upload Failed", result.detail || "An error occurred.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FCF5E3",
        paddingLeft: "4%",
        paddingBottom: "10%",
        paddingRight: "4%",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: 152,
          backgroundColor: "#FFB703",
          borderBottomLeftRadius: 56,
          borderBottomRightRadius: 56,
        }}
      >
        <Image
          source={require("../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
          style={{
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            position: "absolute",
            top: 20,
            left: logoLeftCentered,
            borderRadius: LOGO_RADIUS,
          }}
        />
      </View>

      {/* Title Card */}
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
          elevation: 15,
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

      {/* Input & Upload Sections */}
      {/* (Rest of your code remains unchanged...) */}

      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "5%",
          padding: "1%",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 3,
            borderColor: "#757575F0",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            width: "45%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#D7263D", fontWeight: 500, fontSize: 20 }}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#500B14",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            width: "45%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: 500, fontSize: 20 }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
