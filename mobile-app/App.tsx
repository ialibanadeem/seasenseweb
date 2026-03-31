import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
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
import BoatIcon from './assets/boat-marker.png';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [tripId, setTripId] = useState<string | null>(null);
  const [vesselLocation, setVesselLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [routeHistory, setRouteHistory] = useState<Array<{ latitude: number, longitude: number }>>([]);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);
  const [vesselId, setVesselId] = useState<string | null>(null);
  const [vesselName, setVesselName] = useState("Vessel Loading...");
  const [isCloudflareSynced, setIsCloudflareSynced] = useState(false);
  const [satellites, setSatellites] = useState<number | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tripIdRef = useRef<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const esp32IntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollerRef = useRef<NodeJS.Timeout | null>(null);
  const lastCenterCoords = useRef<{latitude: number, longitude: number} | null>(null);
  
  const [isTripLoading, setIsTripLoading] = useState(false);

  // Manual Trip Control Functions
  const handleStartTrip = async () => {
    if (!vesselId) {
      alert("Error: Vessel not loaded yet.");
      return;
    }
    
    setIsTripLoading(true);
    try {
      console.log(`🚀 Starting trip for vessel ${vesselId}...`);
      const response = await api.post(`/trips/${vesselId}/start`, {
        startTime: new Date().toISOString()
      });
      
      const newTripId = response.data.id;
      setTripId(newTripId);
      tripIdRef.current = newTripId;
      console.log(`✅ Trip started: ${newTripId}`);
    } catch (error) {
      console.error("❌ Failed to start trip:", error);
      alert("Failed to start trip. Check server connection.");
    } finally {
      setIsTripLoading(false);
    }
  };

  const handleEndTrip = async () => {
    if (!tripId) return;
    
    setIsTripLoading(true);
    try {
      console.log(`🏁 Ending trip ${tripId}...`);
      await api.post(`/trips/${tripId}/end`, {
        endTime: new Date().toISOString()
      });
      
      setTripId(null);
      tripIdRef.current = null;
      console.log(`✅ Trip ended successfully`);
    } catch (error) {
      console.error("❌ Failed to end trip:", error);
      alert("Failed to end trip.");
    } finally {
      setIsTripLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const currentLoc = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLoc.coords);

      // Fetch dynamic vessel ID from backend
      try {
        const response = await api.get('/vessels');
        const list = Array.isArray(response.data) ? response.data : response.data.value;
        if (list && list.length > 0) {
          setVesselId(list[0].id);
          setVesselName(list[0].name);
          console.log("🚢 Mobile: Target Vessel set to:", list[0].name, "(", list[0].id, ")");
        }
      } catch (err) {
        console.warn("Failed to fetch vessels, defaulting to hardware mode");
      }
      // 3. User Location Watcher (Manual)
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 5000,
        },
        (loc) => {
          setUserLocation(loc.coords);
        }
      );
      subscriptionRef.current = sub;
    })();

    // 1. DIRECT CLOUDFLARE POLLING (New Priority)
    const pollHardware = async () => {
      try {
        const url = "https://api.demoseassense.top/api/gps?_cb=" + Date.now();
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) return;
        
        const data = await response.json();
        const logsArray = Array.isArray(data) ? data : data.logs;
        
        if (logsArray && logsArray.length > 0) {
          const latestLog = logsArray[logsArray.length - 1];
          updateVesselLocation({
            latitude: Number(latestLog.latitude),
            longitude: Number(latestLog.longitude),
            speed: Number(latestLog.speed_kmh || 0),
            heading: Number(latestLog.heading_deg || 0),
          });
          console.log("☁️ Mobile: Polled direct from Cloudflare");
        }
      } catch (err) {
        console.warn("Direct Polling Error:", err);
      }
    };

    pollHardware(); // Initial fetch
    pollerRef.current = setInterval(pollHardware, 5000);

    // 2. Automate Socket Connectivity (For Trips/Sync)
    socket.connect();
    
    socket.on("connect", () => {
      console.log("📡 Mobile App: Socket Connected to Backend");
    });

    socket.on("vessel_live_update", (data: any) => {
      // Keep socket as backup/sync, but direct poller is faster
      if (!vesselId || data.vesselId === vesselId || data.mmsi === '987654321') {
        const tid = (data.tripId && !data.tripId.includes('live')) ? data.tripId : null;
        if (tid !== tripIdRef.current) {
          setTripId(tid);
          if (!tid) setRouteHistory([]); // Clear breadcrumbs when trip ends
        }

        updateVesselLocation({
          latitude: data.location.lat,
          longitude: data.location.lng,
          speed: data.speed, 
          heading: data.heading,
          altitude: data.altitude,
          satellites: data.satellites,
          isBackendKnots: true 
        } as any);
      }
    });

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.remove();
      if (pollerRef.current) clearInterval(pollerRef.current);
      socket.off("vessel_live_update");
      socket.disconnect();
    };
  }, []);

  // Sync ref with state
  useEffect(() => {
    tripIdRef.current = tripId;
  }, [tripId]);

  const updateVesselLocation = (coords: { latitude: number, longitude: number, speed?: number | null, heading?: number | null, isBackendKnots?: boolean }) => {
    const { latitude, longitude, speed: s, heading: h, isBackendKnots } = coords;

    setVesselLocation(coords as any);
    if (coords.satellites !== undefined) setSatellites(coords.satellites);
    if (coords.altitude !== undefined) setAltitude(coords.altitude);
    
    // If telemetry is from backend socket, speed is already in knots.
    // Otherwise (direct poll), it is in KM/H and needs conversion.
    const speedKnotsValue = isBackendKnots ? (s || 0) : (s ? s * 0.539957 : 0);
    setSpeed(Math.round(speedKnotsValue * 10) / 10);
    setHeading(h ? Math.round(h) : 0);
    setIsCloudflareSynced(true);

    // Reset sync indicator after 10 seconds of no data
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => setIsCloudflareSynced(false), 10000);

    // Update breadcrumb trail
    setRouteHistory(prev => [...prev, { latitude, longitude }]);

    // Hardware Telemetry: No need to emit back to backend if we are using 
    // the Cloudflare link as the single source of truth bridge.
    // socket.emit("location_update", { ... });

    // Follow movement on map for vessel ONLY if it moves significantly
    if (mapRef.current) {
      const latDiff = lastCenterCoords.current ? Math.abs(latitude - lastCenterCoords.current.latitude) : 1;
      const lngDiff = lastCenterCoords.current ? Math.abs(longitude - lastCenterCoords.current.longitude) : 1;
      
      // Threshold: ~0.0001 degrees (~10 meters)
      if (latDiff > 0.0001 || lngDiff > 0.0001) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
        lastCenterCoords.current = { latitude, longitude };
      }
    }
  };



  const mapRegion = vesselLocation ? {
    latitude: vesselLocation.latitude,
    longitude: vesselLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : (userLocation ? {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : {
    latitude: 24.8607,
    longitude: 66.9933,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <MaritimeHeader
          title={vesselName}
          subtitle="Real-time Hardware Sync"
        />

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={mapRegion}
            userInterfaceStyle="light"
          >
            {/* Clean Light Tile layer for maritime look */}
            <UrlTile
              urlTemplate="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png"
              maximumZ={19}
              flipY={false}
            />

            {/* User (Phone) Location Marker */}
            {userLocation && (
              <Marker 
                coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                title="Your Location"
              >
                <View style={styles.userMarker}>
                  <View style={styles.userMarkerInner} />
                </View>
              </Marker>
            )}

            {vesselLocation && (
              <Marker 
                coordinate={{ latitude: vesselLocation.latitude, longitude: vesselLocation.longitude }}
                flat={true}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={[styles.vesselMarker, { transform: [{ rotate: `${heading}deg` }] }]}>
                  <Image 
                    source={BoatIcon} 
                    style={styles.boatImage}
                    resizeMode="contain"
                  />
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

          {/* Telemetry Status Badge */}
          <View style={[styles.syncBadge, { backgroundColor: isCloudflareSynced ? '#4ade80' : '#94a3b8' }]}>
            <View style={[styles.syncDot, { backgroundColor: isCloudflareSynced ? '#166534' : '#475569' }]} />
            <Text style={styles.syncText}>
              {isCloudflareSynced ? 'CLOUDFLARE SYNC: ACTIVE' : 'WAITING FOR CLOUDFLARE...'}
            </Text>
          </View>

          {/* Live Coordinates */}
          {vesselLocation && (
            <View style={styles.coordBox}>
              <View style={styles.coordHeader}>
                <Navigation size={12} color={theme.colors.accent} />
                <Text style={styles.coordLabel}>Vessel Coords</Text>
              </View>
              <Text style={styles.coordValue}>{vesselLocation.latitude.toFixed(5)}°N</Text>
              <Text style={styles.coordValue}>{vesselLocation.longitude.toFixed(5)}°E</Text>
              
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Zap size={10} color={theme.colors.muted} />
                  <Text style={styles.coordLabel}>{satellites ?? 0} SATS</Text>
                </View>
                <View style={styles.metricItem}>
                  <Activity size={10} color={theme.colors.muted} />
                  <Text style={styles.coordLabel}>{altitude ?? 0}m</Text>
                </View>
              </View>
            </View>
          )}

          {/* SOS Button */}
          <View style={styles.sosContainer}>
            <SOSButton
              location={vesselLocation || userLocation || { latitude: 0, longitude: 0 }}
              vesselId={vesselId || 'Shaheen'}
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

            <View style={styles.autoStatusBox}>
              <TouchableOpacity 
                style={[
                  styles.tripButton, 
                  { backgroundColor: tripId ? '#f87171' : '#4ade80' },
                  isTripLoading && { opacity: 0.7 }
                ]}
                onPress={tripId ? handleEndTrip : handleStartTrip}
                disabled={isTripLoading}
              >
                <Text style={styles.tripButtonText}>
                  {isTripLoading ? "PROCESSING..." : (tripId ? "FINISH CURRENT TRIP" : "START NEW TRIP")}
                </Text>
              </TouchableOpacity>
              <Text style={styles.statusDescription}>
                {tripId 
                  ? "Tracking Active: Every move is being recorded to the SeaSense cloud." 
                  : "Vessel at Anchor: Tap 'Start' to begin tracking your journey."
                }
              </Text>
            </View>
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
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boatImage: {
    width: '100%',
    height: '100%',
  },
  vesselMarkerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.accent,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue glow for phone
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6', // Bright blue for user
    borderWidth: 2,
    marginRight: 8,
  },
  coordBox: {
    position: 'absolute',
    top: 90,
    left: 16,
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: theme.roundness.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 120,
  },
  coordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  coordLabel: {
    fontSize: 9,
    color: theme.colors.muted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  coordValue: {
    fontSize: 12,
    color: theme.colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 6,
    gap: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  autoStatusBox: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  statusDescription: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 4,
  },
  tripButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  simulateButton: {
    alignItems: 'center',
  },
  simulateText: {
    color: theme.colors.accent,
    textDecorationLine: 'underline',
  },
  syncBadge: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  }
});
