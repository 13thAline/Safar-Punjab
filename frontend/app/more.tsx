import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Footer from "@/components/footer";
import { useRouter } from "expo-router"; // ✅ use router instead of navigation

export default function More() {
  const [rating, setRating] = useState(4);
  const router = useRouter(); 

  const menuItems = [
    { label: "Change City", screen: "/ChangeCity" },
    { label: "Stops and Stations", screen: "/welcome" }, // ✅ connected to Welcome.tsx
    { label: "Language", screen: "/Language" },
    { label: "Terms and Conditions", screen: "/Terms" },
    { label: "My Grievances", screen: "/Grievances" },
    { label: "Contact Us", screen: "/Contact" },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FCF5E3",
        paddingTop: "10%",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#F0F6D5",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          padding: "5%",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
        }}
      >
        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.screen as any)} // ✅ router.push instead of navigation.navigate
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 5,
              borderColor: "#FFEAB4",
              borderRadius: 30,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "#FFFBF2",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400", color: "#EEAC09" }}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}

        {/* Social Section */}
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Follow us on
        </Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderColor: "#FFEAB4",
                borderWidth: 3,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="twitter" size={45} color="#555" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderColor: "#FFEAB4",
                borderWidth: 3,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="facebook" size={45} color="#555" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderColor: "#FFEAB4",
                borderWidth: 3,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="instagram" size={45} color="#555" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Rating Section */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 3,
            borderColor: "#FFD966",
            borderRadius: 20,
            padding: 12,
            marginTop: 20,
            backgroundColor: "#FFFBF2",
          }}
          onPress={() => alert("Redirect to App Store")}
        >
          <Text style={{ fontSize: 20, color: "#E7A600" }}>
            Rate us on App Store
          </Text>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <FontAwesome
                key={i}
                name={i <= rating ? "star" : "star-o"}
                size={20}
                color="#E7A600"
              />
            ))}
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}
