import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import Footer from "@/components/footer";

export default function BusList() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const router = useRouter();

  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  // Example bus list (later fetch from backend/DB)
  const buses = [
    { number: "14", type: "Non-AC", route: "Amritsar ISBT → Khasa Bus Stand" },
    { number: "21", type: "AC", route: "Railway Station → Batala Road" },
    { number: "33", type: "Express", route: "City Terminal → Cantonment" },
    { number: "42", type: "Deluxe", route: "Goal Bagh → Mahan Singh Gate" },
    { number: "55", type: "City", route: "ISBT → City Bus Stop" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
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

      {/* White Card */}
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
          Welcome Saathi
        </Text>
      </View>

      {/* Bus List */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {buses.map((bus, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: CARD_WIDTH,
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 4,
            }}
            onPress={() => router.push("/busno")}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {/* Bus Number */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#045633",
                }}
              >
                Bus {bus.number}
              </Text>

              {/* Bus Type Badge */}
              <View
                style={{
                  backgroundColor: "#FFB703",
                  borderRadius: 12,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#fff" }}>
                  {bus.type}
                </Text>
              </View>
            </View>

            {/* Route Info */}
            <Text style={{ fontSize: 14, color: "#555", marginTop: 5 }}>
              {bus.route}
            </Text>
          </TouchableOpacity>
        ))}

        
      </View>
      <Footer></Footer>
    </ScrollView>
  );
}
