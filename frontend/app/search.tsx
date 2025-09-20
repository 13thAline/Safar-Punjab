import { View, Text, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Search() {
  const { from: initialFrom, to: initialTo } = useLocalSearchParams();

  const [from, setFrom] = useState(initialFrom || "Not selected");
  const [to, setTo] = useState(initialTo || "Not selected");

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  // Dummy bus data
  const buses = [
    { id: "1", busNo: "Bus 101", route: `${from} → ${to}` },
    { id: "2", busNo: "Bus 202", route: `${from} → ${to}` },
    { id: "3", busNo: "Bus 303", route: `${from} → ${to}` },
  ];

  const renderBus = ({ item }: { item: { id: string; busNo: string; route: string } }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        marginVertical: 8,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 18, color: "#045633" }}>
        {item.busNo}
      </Text>
      <Text style={{ fontFamily: "Montserrat", fontWeight: "500", fontSize: 16, color: "#12201A", marginTop: 4 }}>
        {item.route}
      </Text>
    </View>
  );

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
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

          {/* Card */}
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

          {/* From → To with Swap */}
          <View
            style={{
              marginTop: 40,
              marginHorizontal: 20,
              padding: 16,
              backgroundColor: "#DFE5C6",
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 20, color: "#045633" }}>
                From: {from}
              </Text>
              <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 20, color: "#045633", marginTop: 8 }}>
                To: {to}
              </Text>
            </View>

            <TouchableOpacity
              onPress={swapStations}
              style={{
                backgroundColor: "#045633",
                padding: 10,
                borderRadius: 35,
              }}
            >
              <Text style={{ fontFamily: "Montserrat", fontWeight: "700", fontSize: 16, color: "#FFF" }}>Swap</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: 24,
              color: "#12201A",
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            Available Buses
          </Text>
        </>
      }
    />
  );
}
