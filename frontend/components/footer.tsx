import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      path: "/(tabs)",
      icon: (color: string) => <MaterialIcons name="home" size={28} color="#D7263D" />,
    },
    {
      label: "About Us",
      path: "/about",
      icon: (color: string) => <MaterialIcons name="people" size={28} color="#D7263D" />,
    },
    {
      label: "Track",
      path: "/track",
      icon: (color: string) => <MaterialIcons name="location-on" size={28} color="#D7263D" />,
    },
    {
      label: "More",
      path: "/more",
      icon: (color: string) => <MaterialCommunityIcons name="dots-horizontal" size={28} color="#D7263D" />,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFF6EA", // light cream background like your screenshot
        paddingVertical: 10,
        paddingBottom: 15,
    
        borderColor: "#E0DAD1",
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const activeColor = "#D62828"; // red for active icon/text
        const inactiveColor = "#7C7C7C"; // gray for inactive

        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => router.push(item.path as any)} // 👈 fix TS type error
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {/* Icon */}
            {item.icon(isActive ? activeColor : inactiveColor)}

            {/* Label */}
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat",
                fontWeight: isActive ? "700" : "500",
                color: isActive ? activeColor : inactiveColor,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
