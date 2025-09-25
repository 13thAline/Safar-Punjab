import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Footer from "@/components/footer";

export default function BusInfo() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  const busStops = [
    { name: "Amritsar ISBT", time: "10:00 AM" },
    { name: "Mahan Singh Gate Bus Stand", time: "10:10 AM" },
    { name: "Railway Station Bus Stop", time: "10:20 AM" },
    { name: "City Bus Terminal", time: "10:30 AM" },
    { name: "Amritsar Cantonment", time: "10:40 AM" },
    { name: "Goal Bagh Bus Depo", time: "10:50 AM" },
    { name: "City Bus Stop", time: "11:00 AM" },
    { name: "Batala Road Bus Stop", time: "11:10 AM" },
    { name: "Khasa Bus Stand", time: "11:20 AM" },
  ];

  const [expandedStop, setExpandedStop] = useState<number | null>(null);

  const toggleStop = (index: number) => {
    setExpandedStop(expandedStop === index ? null : index);
  };

  const handleBuyTicket = () => {
    Alert.alert("Ticket Booking", "The feature is currently under development, it will be released soon.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
            backgroundColor: "#dfe5c6",
            borderRadius: 15,
            marginHorizontal: 20,
            padding: 15,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
            marginBottom: 10,
          }}
        >
          {/* Header with Buy Ticket */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#12201A" }}>
                14 Non-AC
              </Text>
              <Text style={{ color: "#555" }}>To Khasa Bus Stand</Text>
            </View>
            <TouchableOpacity
              onPress={handleBuyTicket}
              style={{
                backgroundColor: "#045633",
                paddingHorizontal: 14,
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
              <View key={index} style={{ marginBottom: 12 }}>
                <TouchableOpacity
                  onPress={() => toggleStop(index)}
                  style={{ flexDirection: "row", alignItems: "center" }}
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
                      backgroundColor: expandedStop === index ? "#045633" : "transparent",
                    }}
                  />
                  <Text style={{ fontSize: 16, color: "#333" }}>{stop.name}</Text>
                </TouchableOpacity>

                {/* Expanded Info */}
                {expandedStop === index && (
                  <View style={{ marginLeft: 28, marginTop: 5, backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: "#045633", marginBottom: 3 }}>
                      Arrival Time: {stop.time}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </View>
    </View>
  );
}
