import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useSession } from '@/app/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useSession();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    <View style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
      }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
      }}>Driver Login</Text>
      <TextInput
        style={{
        height: 50,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
      }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{
        height: 50,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
      }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={{
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
      }} onPress={handleLogin}>
        <Text style={{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      }}>Login</Text>
      </Pressable>
    </View>
  );
}