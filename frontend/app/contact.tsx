import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";

export default function Contact() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FCF5E3", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Contact Us
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL("mailto:support@saathiapp.com")}>
        <Text style={{ fontSize: 18, color: "#045633", marginBottom: 10 }}>
          📧 support@saathiapp.com
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("tel:+919876543210")}>
        <Text style={{ fontSize: 18, color: "#045633" }}> +91 9556169524</Text>
      </TouchableOpacity>
    </View>
  );
}
