import { Text,View, Image, Dimensions, TextInput,ScrollView,TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterHeader() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;
  const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;

  const router = useRouter();

  // States for inputs
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // States for uploads
  const [documents, setDocuments] = useState({
    vehiclePermit: null,
    drivingLicense: null,
    registrationCert: null,
    driverPhoto: null,
  });

  const Verification = () => {
     router.push("/driver-verification");
  };
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FCF5E3",paddingTop: "5%"}}>
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
                fontSize: 28,
                lineHeight: 33,
                color: "#045633",
              }}
            >
              Register
            </Text>
          </View>

           <View
        style={{
          width: BIG_BOX_WIDTH,
          minHeight: 400,
          backgroundColor: "#DFE5C6",
          marginTop: 20,
          borderRadius: 32,
          paddingHorizontal: 20,
          paddingTop: 18,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 25,
            lineHeight: 34,
            color: "#500B14",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Personal & Vehicle Details
        </Text>

        {/* Inputs */}
      <View>
        <TextInput
          style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
          placeholder="Full Name"
          placeholderTextColor="#757575F0"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
          placeholder="Mobile Number"
          placeholderTextColor="#757575F0"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
          placeholder="City of Operation"
          placeholderTextColor="#757575F0"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
          placeholder="Vehicle Number"
          placeholderTextColor="#757575F0"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
        <TextInput
          style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
          placeholder="Vehicle Type"
          placeholderTextColor="#757575F0"
          value={vehicleType}
          onChangeText={setVehicleType}
        />
      </View>
    </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" ,marginTop:"5%",padding:"1%" }}>
        <TouchableOpacity style={{ borderWidth: 3, borderColor: "#757575F0", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,width:"40%",alignItems:"center",marginLeft:"5%" }}>
          <Text style={{ color: "#D7263D",fontWeight: 500,fontSize:20 }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={Verification}
        style={{ backgroundColor: "#045633", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,width:"40%",alignItems:"center",marginRight:"5%" }}>
          <Text style={{ color: "white",fontWeight: 500,fontSize:20 }}>Next</Text>
        </TouchableOpacity>
      </View>
  </ScrollView>
  );
}