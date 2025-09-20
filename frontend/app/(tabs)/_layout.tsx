<<<<<<< HEAD
import { Stack } from "expo-router";

=======
// app/_layout.tsx
// import DriverVerificationScreen from '../driver-verification';

// export default function Index() {
//   return <DriverVerificationScreen />;
// }

import { Stack } from "expo-router";

>>>>>>> 0f526719aeffc36a9d54e515a0fccc83c7026e1a
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* Add other screens here later if needed */}
    </Stack>
  );
}