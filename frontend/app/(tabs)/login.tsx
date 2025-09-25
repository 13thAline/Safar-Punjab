import React from 'react';
import { View, TextInput, Dimensions, Text, Pressable, Alert, ScrollView,Image } from 'react-native';
import { useSession } from '@/app/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useSession();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const LOGO_SIZE = 82;
  const LOGO_RADIUS = LOGO_SIZE / 2;
  const logoLeftCentered = SCREEN_WIDTH / 2 - LOGO_SIZE / 2;
  const CARD_WIDTH = SCREEN_WIDTH * 0.9;
   const BIG_BOX_WIDTH = SCREEN_WIDTH * 0.92;

  // ============ MODIFIED THIS FUNCTION ============
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    const result = await signIn(email, password);

    if (result && result.access_token) {
      // If signIn is successful and returns a token, navigate
      Alert.alert('Success', 'Logged in successfully!');
      router.push('/driver-live');
    } else {
      // If signIn fails (returns null or error), show an alert
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };
  // ===============================================

  return (
    <ScrollView  style={{ flex: 1, backgroundColor: "#FCF5E3"}}>
    <View 
    style={{
        height: 152,
        backgroundColor: "#FFB703",
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
      }}>
        <Image
        source={require("../../assets/images/305905a717592dd52a6280845291b56a554a0d49.jpg")}
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

       <View
            style={{
              height: 60,
              width: CARD_WIDTH,
              marginTop: -30,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              alignSelf: "center",
              elevation: 15
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 28,
                lineHeight: 33,
                color: "#045633",
              }}
            >
              Driver Login
            </Text>
          </View>

       <View
       style={{
          width: BIG_BOX_WIDTH,
          minHeight: 300,
          backgroundColor: "#DFE5C6",
          marginTop: 20,
          borderRadius: 32,
          paddingHorizontal: 20,
          paddingTop: 18,
          alignSelf: "center",
        }}>
          <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 28,
            lineHeight: 34,
            color: "#500B14",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Enter your details
        </Text>
      <TextInput
        style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{
            borderWidth: 4,
            borderColor: "#045633",
            borderRadius: 35,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            marginBottom: 12,
            paddingStart: "4%",
            backgroundColor: "#FFFBF2"
          }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={{ backgroundColor: "#045633", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20,alignItems:"center" }} onPress={handleLogin}>
        <Text style={{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      }}>Login</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}