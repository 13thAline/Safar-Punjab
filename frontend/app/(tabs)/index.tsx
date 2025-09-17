import { View, Image, Dimensions, Text } from "react-native";

export default function Index() {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;

  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;

  return (
    <View>
      {/* Yellow Background */}
      <View
        className="relative w-full"
        style={{
          height: 152,
          backgroundColor: "#FFB703",
          borderBottomLeftRadius: 56,
          borderBottomRightRadius: 56,
        }}
      >
        <Image
          source={require("../../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
          className="w-[82px] h-[82px] absolute"
          style={{
            top: 20,
            left: logoLeftCentered,
            borderRadius: LOGO_RADIUS,
          }}
        />
      </View>

      {/* White Card */}
      <View
        className="absolute bg-white shadow-md"
        style={{
          height: 60,
          width: CARD_WIDTH,
          top: 152 - 30,
          left: (SCREEN_WIDTH - CARD_WIDTH) / 2, // ✅ perfectly centered horizontally
          borderRadius: 40,
          justifyContent: "center", // ✅ vertical centering
          alignItems: "center", // ✅ horizontal centering (no need for textAlign anymore)
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 28,
            lineHeight: 28,
            letterSpacing: 0,
            color: "#045633",
          }}
        >
          Welcome Saathi
        </Text>
      </View>
    </View>
  );
}
