// import { StyleSheet, Text, View, Image } from 'react-native'
// import React from 'react'
// import { Dimensions } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function welcome(){

//     const SCREEN_WIDTH = Dimensions.get("window").width;
    
//       const router = useRouter();
//       const LOGO_SIZE = 82;
//       const LOGO_RADIUS = LOGO_SIZE / 2;
    
//       const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
//       const CARD_WIDTH = SCREEN_WIDTH * 0.9;
//       const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;
//       const BIG_IMAGE_WIDTH = BIG_BOX_WIDTH * 0.9;

//   return (
//      <View style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
//           {/* Yellow Header */}
//           <View
//             style={{
//               height: 152,
//               backgroundColor: "#FFB703",
//               borderBottomLeftRadius: 56,
//               borderBottomRightRadius: 56,
//             }}
//           >
//             <Image
//               source={require("../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
//               style={{
//                 width: LOGO_SIZE,
//                 height: LOGO_SIZE,
//                 position: "absolute",
//                 top: 20,
//                 left: logoLeftCentered,
//                 borderRadius: LOGO_RADIUS,
//               }}
//             />
//           </View>

//           <View
//         style={{
//           height: 60,
//           width: CARD_WIDTH,
//           marginTop: -30,
//           borderRadius: 40,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#FFFFFF",
//           shadowColor: "#000",
//           shadowOpacity: 0.1,
//           shadowRadius: 6,
//           shadowOffset: { width: 0, height: 2 },
//           alignSelf: "center",
//           elevation: 15
//         }}
//       >
//         <Text
//           style={{
//             fontFamily: "Montserrat",
//             fontWeight: "700",
//             fontSize: 28,
//             lineHeight: 28,
//             color: "#045633",
//           }}
//         >
//           Welcome
//         </Text>
//       </View>
//           </View>
//   )
// }

import { View, Text, Image, TouchableOpacity, Dimensions,ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import Footer from "@/components/footer";

export default function Welcome() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const router = useRouter();
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;
  const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;

  return (
    <ScrollView>
    <View style={{ flex: 1, backgroundColor: "#FCF5E3",paddingTop: "5%" }}>
      {/* Yellow Header */}
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

      {/* Welcome Card */}
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
            fontSize: 28,
            lineHeight: 28,
            color: "#045633",
          }}
        >
          Welcome Username
        </Text>
      </View>

      {/* Animated Green Tick */}
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <LottieView
          source={require("../assets/animations/success.json")}
          autoPlay
          loop={false}
          style={{ width: 170, height: 170 }}
        />
      </View>

      {/* Thank You Text */}
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Montserrat",
          fontWeight: "800",
          fontSize: 35,
          color: "#045633",
        }}
      >
        Thank you!
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: 30,
          marginTop: 5,
          color: "#045633",
          paddingRight: "2%",
          paddingLeft: "2%"
        }}
      >
        Your documents have been submitted!
      </Text>

      {/* Star Info Box */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 15,
          borderWidth: 2,
          borderColor: "#FFB703",
          padding: 12,
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 28, marginRight: 10 }}>⭐</Text>
        <Text style={{ flex: 1, fontSize: 18, color: "#12201A" }}>
          We're reviewing your details. Verification usually takes 24–48 hours. 
          You’ll be notified via SMS once approved.
        </Text>
      </View>

      {/* Support Section */}
      <View
        style={{
          backgroundColor: "#DFE5C6",
          borderRadius: 15,
          padding: 15,
          marginHorizontal: 20,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "800",
            fontSize: 16,
            marginBottom: 5,
            color: "#045633",
          }}
        >
          Something not right?
        </Text>
        <Text style={{ fontFamily: "Poppins",fontSize: 17, color: "#500B14",fontWeight:"500" }}>
          No worries — you can quickly:
          {"\n"}• Update your details with Edit Info
          {"\n"}• Or talk to us via Contact Support
        </Text>

        {/* Buttons */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#500B14",
              marginRight: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#045633",fontWeight:"600" }}>Edit Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#D7263D",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#D7263D",fontWeight:"600" }}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Return Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          backgroundColor: "#045633",
          paddingVertical: 15,
          borderRadius: 30,
          marginHorizontal: 50,
          marginTop: 30,
          alignItems: "center",
          marginBottom:20
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 18,
            color: "#fff",
        
          }}
        >
          Return To Homepage
        </Text>
      </TouchableOpacity>

      <Footer></Footer>
    </View>
    </ScrollView>
  );
}