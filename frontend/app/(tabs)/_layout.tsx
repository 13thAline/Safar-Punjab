import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import Footer from "@/components/footer";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Stack navigator renders your pages */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Footer always visible at bottom */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5E3", // match your app background
  },
  content: {
    flex: 1, // fills all space above footer
  },
});
