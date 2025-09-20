import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";

export default function Search() {
  const { from, to } = useLocalSearchParams();

  const SCREEN_WIDTH = Dimensions.get("window").width;
    const LOGO_SIZE = 82;
    const LOGO_RADIUS = LOGO_SIZE / 2;
    const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;

  return (
    <View style={{ flex: 1, backgroundColor: "#FCF5E3" }}>
     <View
             style={{
               height: 152,
               backgroundColor: "#FFB703",
               borderBottomLeftRadius: 56,
               borderBottomRightRadius: 56,
               width: SCREEN_WIDTH
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
    </View>
  );
}
