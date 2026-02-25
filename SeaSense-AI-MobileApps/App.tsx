import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, UrlTile, Polyline } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";

import { api } from "@/services/api";
import { socket } from "@/services/socket";
import { Esp32Service } from "@/services/Esp32Service";
import { theme } from "@/theme/Theme";
import { MaritimeHeader, StatsOverlay, SOSButton } from "@/components";

const { width, height } = Dimensions.get('window');

export default function App() {
  const [tripId, setTripId] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [routeHistory, setRouteHistory] = useState<Array<{ latitude: number, longitude: number }>>([]);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);
  const [vesselId] = useState("cb702539-878e-4679-a3c9-d165d0bafcd7"); // Test Vessel 001

  const tripIdRef = useRef<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const esp32IntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc.coords);
    })();

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.remove();
    };
  }, []);

  // Sync ref with state
  useEffect(() => {
    tripIdRef.current = tripId;
  }, [tripId]);

  const updateLocation = (coords: { latitude: number, longitude: number, speed?: number | null, heading?: number | null }) => {
    const { latitude, longitude, speed: s, heading: h } = coords;

    setLocation(coords as any);
    setSpeed(s ? Math.round(s * 1.94384 * 10) / 10 : 0);
    setHeading(h ? Math.round(h) : 0);

    // Update breadcrumb trail
    setRouteHistory(prev => [...prev, { latitude, longitude }]);

    if (tripIdRef.current) {
      socket.emit("location_update", {
        vesselId: vesselId,
        tripId: tripIdRef.current,
        latitude,
        longitude,
        speed: s ?? 0,
        heading: h ?? 0,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const startLocationWatcher = async () => {
    // 1. PHONE LOCATION WATCHER
    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
        timeInterval: 5000,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        updateLocation(loc.coords);

        // Follow movement on map
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }, 1000);
        }
      }
    );
    subscriptionRef.current = sub;

    // 2. ESP32 TRACKER POLLING
    // This is now integrated with your ngrok endpoint
    if (tripIdRef.current) {
      Esp32Service.startPolling(vesselId, tripIdRef.current, (data: import("@/services/Esp32Service").Esp32Telemetry) => {
        updateLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          speed: data.sog,
          heading: data.cog,
          altitude: data.altitude
        } as any);
      });
    }
  };

  const toggleTrip = async () => {
    if (!tripId) {
      try {
        const response = await api.post(`/trips/${vesselId}/start`, {
          startTime: new Date().toISOString()
        });
        const id = response.data.id;
        setTripId(id);
        socket.connect();
        await startLocationWatcher();
      } catch (error: any) {
        if (error.response?.status === 400) {
          const historyResponse = await api.get(`/trips/history/${vesselId}`);
          const activeTrip = historyResponse.data.find((t: any) => t.status === "ACTIVE");
          if (activeTrip) {
            setTripId(activeTrip.id);
            socket.connect();
            await startLocationWatcher();
          }
        }
      }
    } else {
      try {
        await api.post(`/trips/${tripId}/end`, {
          endTime: new Date().toISOString()
        });
        socket.disconnect();
        if (subscriptionRef.current) {
          subscriptionRef.current.remove();
          subscriptionRef.current = null;
        }
        Esp32Service.stopPolling();
        setTripId(null);
        setRouteHistory([]); // Clear trail on end
      } catch (error) {
        console.error("End trip error:", error);
      }
    }
  };

  const mapRegion = location ? {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : {
    latitude: 24.8607,
    longitude: 66.9933,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <MaritimeHeader
          title="Samundri Shaheen"
          subtitle="KHI-2024-001"
        />

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={mapRegion}
            userInterfaceStyle="dark"
            customMapStyle={darkMapStyle}
          >
            {/* Tile layer for dark maritime look */}
            <UrlTile
              urlTemplate="https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
              maximumZ={19}
              flipY={false}
            />

            {location && (
              <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
                <View style={styles.vesselMarker}>
                  <View style={styles.vesselMarkerInner} />
                </View>
              </Marker>
            )}

            {routeHistory.length > 1 && (
              <Polyline
                coordinates={routeHistory}
                strokeColor={theme.colors.accent}
                strokeWidth={3}
                lineDashPattern={Platform.OS === 'ios' ? [5, 5] : undefined}
              />
            )}
          </MapView>

          {/* Stats Bar */}
          <StatsOverlay speed={speed} heading={heading} depth={42} />

          {/* Live Coordinates */}
          <View style={styles.coordBox}>
            <View style={styles.coordHeader}>
              <MapPin size={12} color={theme.colors.accent} />
              <Text style={styles.coordLabel}>LIVE POSITION</Text>
            </View>
            <Text style={styles.coordValue}>
              {location ? `${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(4)}°E` : 'Locating...'}
            </Text>
          </View>

          {/* SOS Button */}
          <View style={styles.sosContainer}>
            <SOSButton
              location={location || { latitude: 0, longitude: 0 }}
              vesselId={vesselId}
              tripId={tripId}
            />
          </View>

          {/* Action Button & Route Footer */}
          <View style={styles.footer}>
            <View style={styles.routeBox}>
              <View style={styles.routeHeader}>
                <View style={styles.onlineDot} />
                <Text style={styles.routeLabel}>ACTIVE ROUTE</Text>
              </View>
              <View style={styles.routePath}>
                <Text style={styles.routeName}>
                  {tripId ? "Tracking Active" : "Waiting for Start"}
                </Text>
                {tripId && (
                  <>
                    <Text style={styles.routeSeparator}>•</Text>
                    <Text style={styles.routeName}>{routeHistory.length} nodes</Text>
                  </>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.bigButton, tripId ? styles.endButton : styles.startButton]}
              onPress={toggleTrip}
            >
              <Text style={styles.bigButtonText}>
                {tripId ? "END TRIP" : "START NEW TRIP"}
              </Text>
            </TouchableOpacity>

            {tripId && (
              <TouchableOpacity
                style={styles.simulateButton}
                onPress={() => updateLocation({
                  latitude: (location?.latitude || 24.86) + (Math.random() * 0.005),
                  longitude: (location?.longitude || 66.99) - (Math.random() * 0.005),
                  speed: 15,
                  heading: Math.random() * 360,
                })}
              >
                <Text style={styles.simulateText}>Simulate ESP32 Gear Data</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  vesselMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  vesselMarkerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.accent,
    borderWidth: 2,
    borderColor: '#fff',
  },
  coordBox: {
    position: 'absolute',
    top: 90,
    left: 16,
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: theme.roundness.md,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  coordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coordLabel: {
    fontSize: 9,
    color: theme.colors.muted,
    fontWeight: 'bold',
  },
  coordValue: {
    fontSize: 11,
    color: theme.colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 2,
  },
  sosContainer: {
    position: 'absolute',
    bottom: 220,
    right: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 16,
  },
  routeBox: {
    gap: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
  },
  routeLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    fontWeight: 'bold',
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  routeSeparator: {
    color: theme.colors.muted,
  },
  bigButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: theme.colors.accent,
  },
  endButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  bigButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  simulateButton: {
    alignItems: 'center',
  },
  simulateText: {
    fontSize: 12,
    color: theme.colors.accent,
    textDecorationLine: 'underline',
  }
});
