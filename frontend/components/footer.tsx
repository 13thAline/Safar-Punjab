import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      path: "/(tabs)",
      icon: (color: string) => <MaterialIcons name="home" size={28} color={color} />,
    },
    {
      label: "About Us",
      path: "/aboutus",
      icon: (color: string) => <MaterialIcons name="people" size={28} color={color} />,
    },
    {
      label: "Track",
      path: "/track",
      icon: (color: string) => <MaterialIcons name="location-on" size={28} color={color} />,
    },
    {
      label: "More",
      path: "/more",
      icon: (color: string) => <MaterialCommunityIcons name="dots-horizontal" size={28} color={color} />,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFF6EA",
        paddingVertical: 10,
        paddingBottom: 35,
        borderColor: "#E0DAD1",
      }}
    >
      {navItems.map((item) => {
        const isActive =
          (item.path === "/(tabs)" && (pathname === "/" || pathname === "/(tabs)")) ||
          pathname === item.path;

        const activeColor = "#D7263D";
        const inactiveColor = "#7C7C7C";

        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => router.push(item.path as any)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {item.icon(isActive ? activeColor : inactiveColor)}

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
