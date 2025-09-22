import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const welcome = () => {

    const SCREEN_WIDTH = Dimensions.get("window").width;
    
      const router = useRouter();
      const LOGO_SIZE = 82;
      const LOGO_RADIUS = LOGO_SIZE / 2;
    
      const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
      const CARD_WIDTH = SCREEN_WIDTH * 0.9;
      const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;
      const BIG_IMAGE_WIDTH = BIG_BOX_WIDTH * 0.9;

  return (
     <View style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
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
            lineHeight: 28,
            color: "#045633",
          }}
        >
          Welcome
        </Text>
      </View>
          </View>
  )
}

export default welcome

const styles = StyleSheet.create({})