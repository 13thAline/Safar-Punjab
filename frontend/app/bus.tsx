import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

export default function BusInfo() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  // Example bus stops (later replace with live data from backend/maps)
  const busStops = ["Amritsar ISBT", "Mahan Singh Gate Bus Stand"," Railway Station Bus Stop", "City Bus Terminal", "Amritsar Cantonment", "Goal Bagh Bus Depo", "City Bus Stop", "Batala Road Bus Stop"," Khasa Bus Stand"];

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
            fontSize: 28,
            lineHeight: 33,
            color: "#045633",
          }}
        >
          Bus Info
        </Text>
      </View>

      {/* Map Placeholder */}
      <View
        style={{
          height: 250,
          backgroundColor: "#dfe5c6",
          borderRadius: 20,
          margin: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#444" }}>🗺️ Map will be displayed here</Text>
      </View>

      {/* Bus Route Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          marginHorizontal: 20,
          padding: 15,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#12201A" }}>
              14 Non-AC
            </Text>
            <Text style={{ color: "#555" }}>To Kalinga Vihar</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#045633",
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Bus Stops */}
        <View style={{ marginTop: 15 }}>
          {busStops.map((stop, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              {/* Circle indicator */}
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "#045633",
                  marginRight: 12,
                }}
              />
              <Text style={{ fontSize: 16, color: "#333" }}>{stop}</Text>
              
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
