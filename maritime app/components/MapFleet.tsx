"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const start: [number, number] = [24.8607, 67.0011];
const end: [number, number] = [25.3960, 68.3578];

export default function MapFleet() {
  const [position, setPosition] = useState(start);

  useEffect(() => {
    let step = 0;
    const totalSteps = 100;

    const interval = setInterval(() => {
      step++;

      const lat = start[0] + ((end[0] - start[0]) * step) / totalSteps;
      const lng = start[1] + ((end[1] - start[1]) * step) / totalSteps;

      setPosition([lat, lng]);

      if (step >= totalSteps) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={start} zoom={7} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ROUTE */}
      <Polyline positions={[start, end]} pathOptions={{ color: "blue" }} />

      {/* MOVING FLEET */}
      <Marker position={position}>
        <Popup>Fleet moving...</Popup>
      </Marker>
    </MapContainer>
  );
}
