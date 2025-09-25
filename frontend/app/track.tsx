import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Stack, useLocalSearchParams } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
const WS_URL = API_URL.replace('http://', 'ws://');

const INITIAL_REGION = {
  latitude: 30.704650,
  longitude: 76.717873,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

// Haversine formula to calculate distance
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Speed calculation in km/h
function calculateSpeed(
  prevLat: number,
  prevLon: number,
  newLat: number,
  newLon: number,
  timeDiffSec: number
) {
  const distanceKm = getDistanceKm(prevLat, prevLon, newLat, newLon);
  const hours = timeDiffSec / 3600;
  return distanceKm / hours;
}

// ETA in minutes
function calculateETA(distanceKm: number, avgSpeedKmh: number) {
  if (avgSpeedKmh <= 0) return null;
  const hours = distanceKm / avgSpeedKmh;
  return Math.round(hours * 60);
}

export default function TrackScreen() {
  const { busId } = useLocalSearchParams<{ busId: string }>();
  const mapRef = useRef<MapView | null>(null);

  const [busLocation, setBusLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 20.3140,
    longitude: 85.8240,
  });
  const [avgSpeed, setAvgSpeed] = useState<number | null>(null);
  const [eta, setEta] = useState<number | null>(null);

  const prevLocation = useRef<{ lat: number; lon: number; timestamp: number } | null>(null);
  const speedHistory = useRef<number[]>([]);

  useEffect(() => {
    if (!WS_URL || !busId) return;

    const ws = new WebSocket(`${WS_URL}/ws/track/${busId}`);

    ws.onopen = () => console.log('WebSocket connected');
    ws.onerror = (err) => console.error('WebSocket error', err);
    ws.onclose = () => console.log('WebSocket closed');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!data.lat || !data.lon) return;

        const newLat = data.lat;
        const newLon = data.lon;
        const timestamp = Date.now() / 1000;

        // calculate speed & avg speed
        if (prevLocation.current) {
          const timeDiff = timestamp - prevLocation.current.timestamp;
          if (timeDiff > 0) {
            const speed = calculateSpeed(
              prevLocation.current.lat,
              prevLocation.current.lon,
              newLat,
              newLon,
              timeDiff
            );

            speedHistory.current.push(speed);
            if (speedHistory.current.length > 5) speedHistory.current.shift();

            const avg = speedHistory.current.reduce((a, b) => a + b, 0) / speedHistory.current.length;
            setAvgSpeed(avg);

            if (destination) {
              const dist = getDistanceKm(newLat, newLon, destination.latitude, destination.longitude);
              const etaMinutes = calculateETA(dist, avg);
              setEta(etaMinutes);
            }
          }
        }

        prevLocation.current = { lat: newLat, lon: newLon, timestamp };
        setBusLocation({ latitude: newLat, longitude: newLon });

        // animate map to show current bus location
        mapRef.current?.animateCamera(
          { center: { latitude: newLat, longitude: newLon }, zoom: 15 },
          { duration: 700 }
        );

      } catch (e) {
        console.error('Invalid WS message', e);
      }
    };

    return () => ws.close();
  }, [busId, destination]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION}>
        {busLocation && <Marker coordinate={busLocation} title="Bus" description="Live Location" />}
        {destination && <Marker coordinate={destination} pinColor="blue" title="Station" />}
        {busLocation && destination && <Polyline coordinates={[busLocation, destination]} strokeColor="red" strokeWidth={3} />}
      </MapView>

      <View style={styles.infoBox}>
        <Text>Average Speed: {avgSpeed ? avgSpeed.toFixed(2) + " km/h" : "Calculating..."}</Text>
        <Text>ETA: {eta !== null ? `${eta} minutes` : "Calculating..."}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
});
