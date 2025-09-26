import { View, Text } from "react-native";
import React from "react";

export default function Language() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FCF5E3", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "#045633" }}>
        Language Settings
      </Text>
      <Text style={{ fontSize: 16, color: "#555", marginTop: 10 }}>
        Choose your preferred language.
      </Text>
    </View>
  );
}
