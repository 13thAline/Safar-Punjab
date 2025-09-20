// app/_layout.tsx
// import DriverVerificationScreen from '../driver-verification';

// export default function Index() {
//   return <DriverVerificationScreen />;
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* Add other screens here later if needed */}
    </Stack>
  );
}