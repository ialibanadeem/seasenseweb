import React, { useState } from "react";
import { View, Button } from "react-native";
import { api } from "../services/api";
import { socket } from "../services/socket";
import { startLocationWatcher, stopLocationWatcher } from "../hooks/useLocationSender";

export default function TripScreen() {
  const [tripId, setTripId] = useState<string | null>(null);

  // Defaulting to Shaheen's UUID for deployment
  const vesselId = "b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e";

  const startTrip = async () => {
    try {
      const response = await api.post(`/trips/${vesselId}/start`, {
        startTime: new Date().toISOString()
      });
      const id = response.data.id;
      setTripId(id);

      startLocationWatcher(id);
    } catch (e) {
      console.error("Failed to start trip", e);
    }
  };

  const endTrip = async () => {
    try {
      if (!tripId) return;
      await api.post(`/trips/${tripId}/end`, { 
        endTime: new Date().toISOString() 
      });
      stopLocationWatcher();
      setTripId(null);
    } catch (e) {
      console.error("Failed to end trip", e);
    }
  };

  const triggerSOS = () => {
    socket.emit("sos_triggered", { tripId, vesselId });
  };

  return (
    <View>
      <Button title="Start Trip" onPress={startTrip} />
      <Button title="End Trip" onPress={endTrip} />
      <Button title="SOS" onPress={triggerSOS} color="red" />
    </View>
  );
}
