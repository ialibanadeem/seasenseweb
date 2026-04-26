# SeaSense AI: Comprehensive System Logic & Feature Deep-Dive

This document provides a granular explanation of the logic, data processing, functional behavior, and deployment architecture of the SeaSense AI ecosystem.

---

## 🧭 Navigation & Page Logic

### 1. Command Center (Dashboard Home - `/`)
The primary mission-control interface designed for immediate situational awareness.
*   **Live Background Map**: Uses **MapTiler SDK** and **Socket.io** for sub-second telemetry updates.
*   **Fleet Status Card**: 
    *   `Active (Moving)`: `speed > 2 knots` and `lastSeen < 5 mins`.
    *   `Idle`: `speed <= 2 knots` and `lastSeen < 5 mins`.
    *   `Offline`: `lastSeen > 5 mins`.
*   **Emergency SOS Overlay**: A global state listener that triggers a high-contrast modal when an `SOS_TRIGGERED` event is received via WebSocket.

### 2. Fleet Master (`/fleet`)
The central registry for all maritime assets.
*   **Vessel Health Cards**: Displays real-time **Speed**, **Fuel Level**, **Heading**, and **Engine Status**.
*   **Visual States**: Uses a greyscale filter for **Offline** vessels to visually indicate communication loss.

### 3. Marine Intelligence (`/intelligence`)
A predictive safety dashboard powered by oceanographic data.
*   **Risk Level Engine**: Analyzes real-time weather and marine telemetry using the following thresholds:
    *   🔴 **Dangerous**: `Wave Height > 2.0m` OR `Current Speed > 1.5 knots`.
    *   🟡 **Moderate**: `Wave Height > 1.0m` OR `Current Speed > 0.8 knots`.
    *   🟢 **Safe**: `Wave Height <= 1.0m` AND `Current Speed <= 0.8 knots`.
*   **Sea Condition Score**: A composite safety metric (0-100) calculated as: `100 - (WaveHeight * 25) - (CurrentSpeed * 15)`.

---

## 🛡️ System Resilience & Fault Tolerance

To ensure mission-critical reliability, SeaSense AI implements several layers of resilience against external service failures:

### 1. Weather API Resilience
External maritime APIs (like Open-Meteo) can occasionally return partial data or experience timeouts. The system implements:
*   **Optional Chaining & Null Coalescing**: All telemetry fields use the `?? 0` or `?.` pattern. If a specific data point (like `wave_height`) is missing, the system defaults to `0` instead of crashing (Error 500).
*   **Request Timeouts**: All external API calls are strictly capped at **8 seconds**. This prevents a slow external service from hanging the entire SeaSense backend.
*   **Error Bubbling**: Descriptive error messages are logged with full stack traces, allowing developers to quickly identify if an issue is network-related or data-format-related.

### 2. Connectivity Monitoring
*   **Heartbeat Logic**: The backend continuously monitors the "last seen" timestamp of every vessel. If a vessel stops broadcasting, the system automatically transitions it to an **Offline** state rather than showing stale data.

---

## 🚀 Production Deployment & Infrastructure

### 1. Multi-Cloud Architecture
*   **Frontend Dashboard**: Deployed on **Vercel** for high-speed edge delivery.
*   **Backend Services**: Deployed on **Render** (main-api and gps-ingestion).
*   **Database**: **Managed PostgreSQL on Render** with the PostGIS extension.

---

## 🌊 Non-Technical Overview (Layman's Terms)

### 1. What is SeaSense AI?
SeaSense AI is like an **"Air Traffic Control"** system, but for boats. It allows fleet owners to see exactly where every vessel is, how it's behaving, and whether it's safe to be out on the water.

### 2. Smart Mapping (PostGIS & ST_Within)
The map doesn't just show images; it actually **understands geography**. Using "PostGIS," the system knows exactly where the land ends and the water begins.

### 3. Automatic Weather Warnings (Risk Engine)
The system checks the ocean's "mood" 24/7. Even if the external weather service is having a bad day, SeaSense is built to stay up and running, showing you the most reliable data possible.
