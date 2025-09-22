// frontend/app/track.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Stack, useLocalSearchParams } from 'expo-router';

// Make sure your .env file has the correct IP and this variable is prefixed with EXPO_PUBLIC_
const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
// Convert http:// to ws:// for the WebSocket connection
const WS_URL = API_URL.replace('http://', 'ws://');

// A default location (Bhubaneswar) for the initial map view
const INITIAL_REGION = {
  latitude: 20.2961,
  longitude: 85.8245,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function TrackScreen() {
  // In a real app, this would be passed from the search screen
  // e.g., router.push({ pathname: '/track', params: { busId: 'driver123' }})
  const { busId } = useLocalSearchParams<{ busId: string }>();
  const [busLocation, setBusLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Ensure we have a busId to track and a valid WebSocket URL
    if (!busId || !WS_URL) {
      setConnectionStatus('Error: Invalid Bus ID or API URL.');
      return;
    }

    const ws = new WebSocket(`${WS_URL}/ws/track/${busId}`);
    websocket.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus('Live');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.lat && data.lon) {
          console.log('Received location:', data);
          setBusLocation({ latitude: data.lat, longitude: data.lon });
        }
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
      Alert.alert('Connection Error', 'Could not connect to the live tracking service.');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Disconnected');
    };

    // Cleanup function: close the connection when the component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [busId]); // Re-run effect if the busId changes

  return (
    <>
      <Stack.Screen options={{ title: `Tracking Bus: ${busId}` }} />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
        >
          {busLocation && (
            <Marker
              coordinate={busLocation}
              title={`Bus ${busId}`}
              description="Live Location"
              // You can use a custom bus icon here
              // image={require('../assets/images/busIcon.png')}
            />
          )}
        </MapView>
        <View style={styles.statusBar}>
            <Text style={styles.statusText}>Status: {connectionStatus}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    alignItems: 'center',
  },
  statusText: {
    fontWeight: 'bold',
  },
});