import { View, Text, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import Footer from "@/components/footer";

export default function Search() {
  const { from: initialFrom, to: initialTo } = useLocalSearchParams();
  const router = useRouter();

  const [from, setFrom] = useState(initialFrom || "Not selected");
  const [to, setTo] = useState(initialTo || "Not selected");

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  // Dummy bus data
  const buses = [
    { id: "1", busNo: "Bus 101", route: `${from} → ${to}`, type: "Public", nearestStop: "Main Chowk", ac: true },
    { id: "2", busNo: "Bus 202", route: `${from} → ${to}`, type: "Private", nearestStop: "Bus Stand", ac: false },
    { id: "3", busNo: "Bus 303", route: `${from} → ${to}`, type: "Public", nearestStop: "Market Stop", ac: true },
  ];

  const renderBus = ({ item }: { item: (typeof buses)[0] }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        marginVertical: 9,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 10,
        borderColor: "#DFE5C6",
        position: "relative",
      }}
    >
      {/* AC / Non-AC badge */}
      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: item.ac ? "#28A745" : "#D62828",
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 12, color: "#FFF" }}>
          {item.ac ? "AC" : "Non-AC"}
        </Text>
      </View>

      {/* Bus Info */}
      {/* <Text style={{ fontFamily: "Montserrat", fontWeight: "600", fontSize: 18, color: "#757575F0" }}>
        {item.busNo} • {item.type}
      </Text> */}

        <Text style={{ fontFamily: "Montserrat", fontWeight: "600", fontSize: 18, color: "#757575F0" }}>
           {item.busNo} •{" "}
        <Text style={{ color: "#FFB703" }}>{item.type}</Text>
        </Text>


      <Text style={{ fontFamily: "Montserrat", fontWeight: "500", fontSize: 16, color: "#045633", marginTop: 4 }}>
        {item.route}
      </Text>

      <Text style={{ fontFamily: "Montserrat", fontWeight: "500", fontSize: 14, color: "#500B14", marginTop: 6 }}>
        Nearest Stop: {item.nearestStop}
      </Text>

      {/* Track Bus button inside card */}
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/track", params: { busNo: item.busNo } })}
        style={{
          marginTop: 10,
          backgroundColor: "#045633",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 14, color: "#FFF" }}>
          🚍 Track Bus
        </Text>
      </TouchableOpacity>
    </View>
  );

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
      <FlatList
        data={buses}
        keyExtractor={(item) => item.id}
        renderItem={renderBus}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View
              style={{
                height: 152,
                backgroundColor: "#FFB703",
                borderBottomLeftRadius: 56,
                borderBottomRightRadius: 56,
                width: SCREEN_WIDTH,
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

            {/* Greeting Card */}
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
              <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 28, color: "#045633" }}>
                Hi Saathi
              </Text>
            </View>

            {/* From → To Card */}
            <View
            style={{
              marginTop: 40,
              marginHorizontal: 20,
              padding: 10,
              backgroundColor: "#FCF5E3",
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "#FFB703",
              alignItems: "center", // center everything
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 20,
                color: "#045633",
                marginBottom: 4,
              }}
            >
              From: {from}
            </Text>

            {/* Circular Swap Button */}
            <TouchableOpacity
              onPress={swapStations}
              style={{
                backgroundColor: "#045633",
                padding: 15,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 12,
              }}
            >
              <Ionicons name="swap-vertical" size={28} color="#FFF" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 20,
                color: "#045633",
              }}
            >
              To: {to}
            </Text>
          </View>

            {/* Section Title */}
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 24,
                color: "#500B14",
                marginTop: 30,
                marginLeft: 20,
              }}
            >
              Available Buses
            </Text>
          </>
        }
      />

      {/* Footer always visible */}
      <Footer />
    </View>
  );
}
