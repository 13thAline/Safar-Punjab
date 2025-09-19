import { View, Image, Dimensions, Text, FlatList, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { stations } from "@/data/station";

export default function Index() {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;

  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;
  const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;
  const BIG_IMAGE_WIDTH = BIG_BOX_WIDTH * 0.9;

  // Dropdown States
  const [fromOpen, setFromOpen] = useState(false);
  const [fromStation, setFromStation] = useState(null);

  const [toOpen, setToOpen] = useState(false);
  const [toStation, setToStation] = useState(null);

  const handleSearch = () => {
    console.log("Searching buses from", fromStation, "to", toStation);
  };

  const handleRegisters = () => {
    console.log("Register");
  };

  const handleBusNoPress = () => {
    console.log("Bus No button pressed");
  };

  const handleRoutePress = () => {
    console.log("Route button pressed");
  };

  const renderContent = () => (
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
          source={require("../../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
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

      {/* Big Box */}
      <View
        style={{
          width: BIG_BOX_WIDTH,
          minHeight: 486,
          backgroundColor: "#DFE5C6",
          marginTop: 50,
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
            fontSize: 30,
            lineHeight: 34,
            color: "#12201A",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Travel Anywhere
        </Text>

        {/* FROM Station Picker */}
        <View style={{ zIndex: fromOpen ? 2 : 1, marginBottom: 20 }}>
          <DropDownPicker
            open={fromOpen}
            value={fromStation}
            items={stations}
            setOpen={setFromOpen}
            setValue={setFromStation}
            placeholder="Select From Station"
            style={{
              borderRadius: 35,
              borderColor: "#FFB703",
              borderWidth: 3,
            }}
            dropDownContainerStyle={{
              borderColor: "#FFB703",
              zIndex: 3000,
            }}
            textStyle={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: 16,
              color: "#045633",
            }}
            placeholderStyle={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: 16,
              color: "#045633",
            }}
          />
        </View>

        {/* TO Station Picker */}
        <View style={{ zIndex: toOpen ? 2 : 1, marginBottom: 30 }}>
          <DropDownPicker
            open={toOpen}
            value={toStation}
            items={stations}
            setOpen={setToOpen}
            setValue={setToStation}
            placeholder="Select To Station"
            style={{
              borderRadius: 35,
              borderColor: "#FFB703",
              borderWidth: 3,
            }}
            dropDownContainerStyle={{
              borderColor: "#FFB703",
              zIndex: 3000,
            }}
            textStyle={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: 16,
              color: "#045633",
            }}
            placeholderStyle={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: 16,
              color: "#045633",
            }}
          />
        </View>

        {/* Search Button */}
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: "#D7263D",
            paddingVertical: 12,
            borderRadius: 35,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: 20,
              color: "#E2E2E2",
            }}
          >
            Search Nearby Buses
          </Text>
        </TouchableOpacity>

        {/* Filter Title */}
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 26,
            color: "#12201A",
            textAlign: "center",
            paddingVertical: 30,
          }}
        >
          Or filter through
        </Text>

        {/* Buttons Row */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
          {/* Bus No Button */}
          <TouchableOpacity
            onPress={handleBusNoPress}
            style={{
              flex: 1,
              backgroundColor: "#045633",
              paddingVertical: 12,
              borderRadius: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 18,
                color: "#E2E2E2",
              }}
            >
              Bus No
            </Text>
          </TouchableOpacity>

          {/* Route Button */}
          <TouchableOpacity
            onPress={handleRoutePress}
            style={{
              flex: 1,
              backgroundColor: "#045633",
              paddingVertical: 12,
              borderRadius: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Route
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Second Box */}
      <View
        style={{
          width: BIG_BOX_WIDTH,
          minHeight: 486,
          backgroundColor: "#DFE5C6",
          marginTop: 50,
          borderRadius: 32,
          paddingHorizontal: 20,
          paddingTop: 18,
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../assets/images/43f6c055c931d7ebf52ec5b1240d8256113447f7 (1).png")}
          style={{
            top: 3,
            width: BIG_IMAGE_WIDTH,
            height: 200,
            borderRadius: 20,
            alignSelf: "center",
          }}
        />

        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 28,
            color: "#045633",
            top: 12,
          }}
        >
          Got an Empty Seat?
        </Text>

        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: 21,
            color: "#D7263D",
            top: 22,
          }}
        >
          Get verified today!
        </Text>

        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: 18,
            color: "#500B14",
            top: 35,
          }}
        >
          Already on the road? Our platform connects you with customers heading
          in your direction to fill empty seats and boost your earnings.
        </Text>

        {/* REGISTER BUTTON (Right aligned with fixed height) */}
        <View style={{ alignItems: "flex-end", marginTop: 50 }}>
          <TouchableOpacity
            onPress={handleRegisters}
            style={{
              backgroundColor: "#045633",
              paddingVertical: 12,
              width: LOGO_SIZE + 90,
              height: 50,
              borderRadius: 35,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={[{ key: "main" }]}
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
    />
  );
}
