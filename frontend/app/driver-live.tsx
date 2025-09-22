// frontend/app/driver-live.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
// This would come from your login/auth state
const DRIVER_ID = "driver123"; 

export default function DriverLiveScreen() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  // --- THIS IS THE FIX ---
  // The type for setInterval's ID is 'number' in React Native, not NodeJS.Timeout
  const intervalRef = useRef<number | null>(null);

  // Request permissions when the screen loads
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const sendLocation = async () => {
    try {
      // Use a less battery-intensive accuracy for background tasks
      const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);

      await fetch(`${API_URL}/location/update/${DRIVER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        }),
      });
      console.log('Location sent:', currentLocation.coords);
    } catch (error) {
      console.error("Failed to send location:", error);
    }
  };

  const startTransmitting = () => {
    if (intervalRef.current) return;
    setIsTransmitting(true);
    sendLocation(); 
    // The 'any' cast here is a clean way to handle the type discrepancy
    intervalRef.current = setInterval(sendLocation, 15000) as any; 
  };

  const stopTransmitting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTransmitting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Broadcast</Text>
      <Text style={styles.status}>
        Status: {isTransmitting ? 'Transmitting...' : 'Offline'}
      </Text>
      
      {!isTransmitting ? (
        <Button title="Go Live & Start Transmitting" onPress={startTransmitting} />
      ) : (
        <Button title="Stop Transmitting" onPress={stopTransmitting} color="red" />
      )}

      {location && (
        <View style={styles.locationInfo}>
          <Text>Current Lat: {location.coords.latitude.toFixed(4)}</Text>
          <Text>Current Lon: {location.coords.longitude.toFixed(4)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  status: { fontSize: 18, marginBottom: 20, fontStyle: 'italic' },
  locationInfo: { marginTop: 30, alignItems: 'center' },
});