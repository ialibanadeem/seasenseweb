# Sea Sense AI: Platform Functionalities & System Logic

This document serves as a comprehensive overview of the features, architectural decisions, and functional logic integrated into the **Sea Sense AI Fleet Management Dashboard**, with a deep dive into the mathematical and computational telemetry mechanics powering the real-time tracking algorithms.

---

## 1. Global State Management (Zustand)
We implemented a strict, unified state-management architecture using **Zustand** rather than relying on deep React Prop-Drilling or complex Context APIs.

- **\`useVesselStore\`**: Acts as the single source of truth for the entire fleet's live telemetry. It securely holds:
  - \`livePositions\`: A dictionary of all vessels and their statuses.
  - \`liveTrails\`: Arrays of historical geographic coordinates mapped to each vessel.
  - \`activeEmergency\`: A globally hoisted critical alert that triggers the map to auto-fly.
- **\`useThemeStore\`**: Controls the global Dark/Light UI aesthetics.

---

## 2. Dynamic Maritime Mapping (MapTiler SDK)
The default generic map engine was replaced with a highly specialized **MapTiler** vector rendering SDK, defaulting to the \`ocean\` cartography style to emphasize coastal geography and bathymetry.

- **Auto-Centering Logic**: Both dashboards are geographically biased to center on Kemari Port, Karachi \`[66.9806, 24.8143]\`. 
- **Dynamic Trail Rendering**: GeoJSON \`LineString\` features are continuously parsed from \`liveTrails\` arrays to draw continuous blue trailing paths behind ships.

---

## 3. Photorealistic 3D Live Telemetry Markers
Standard flat "green dots" were completely replaced with highly responsive UI logic.

- **Photorealistic Raster Assets**: The marker uses a high-resolution top-down PNG image of a wooden rowboat (\`boat-marker.png\`).
- **Mathematical Compass Rotation (Heading Math)**: 
  The raw heading telemetry determines physical CSS rotations. If a vessel transmits a heading of \`180\` (South), the DOM injects \`style="transform: rotate(180deg)"\`.
  *Logic Notice*: Because the raw PNG boat asset was photographed pointing diagonally North-West, a compensatory matrix of \`rotate(-45deg)\` is permanently applied beneath the primary wrapper so the bow always mathematically aligns perfectly to True North (\`0 deg\`) when telemetry reads 0.
- **Micro-Physics & Fluid Dynamics**: The CSS applies a \`bounce\` keyframe loop to physically modulate the Y-axis pixel spacing organically over 3 seconds to emulate ocean wave buoyancy.
- **Status Aura Logic**: 
  - \`IF status === 'ACTIVE' OR speed > 2\`: Injects \`(0px 10px 12px #10b981)\` drop-shadow. 
  - \`IF status === 'IDLE'\`: Injects \`#f59e0b\` drop-shadow.
  - \`IF isEmergency\`: Triggers an overarching pulsating red ping loop using \`scale-150\`.

---

## 4. Intelligent Fleet Simulator (\`useFakeKarachiBoats\`)
To stress-test UI performance safely, we wrote an intelligent geographic interpolator computing paths between Kemari, Manora Island, and Churna.

### Computation Logic: Geographic Interpolation
The hook tracks \`(currentLng, currentLat)\` and \`(targetLng, targetLat)\`. Every 2000ms:
1. **Delta Calculation**: It parses the remaining distance:
   \`\`\`javascript
   const dx = targetLng - currentLng;
   const dy = targetLat - currentLat;
   \`\`\`
2. **Speed-Based Travel Step**: It translates real-world speed (in knots) down into geographic decimal coordinates:
   \`\`\`javascript
   const step = 0.005; // Decimal step constraint (~500m increments)
   const distance = Math.hypot(dx, dy); // Hypotenuse Euclidean distance formula
   \`\`\`
3. **True Compass Heading Math (\`atan2\`)**: 
   To calculate to the exact degree where the boat nose must physically point, the engine calls Arc-Tangent 2:
   \`\`\`javascript
   const angleRad = Math.atan2(dx, dy); // X, Y transposed to map against True North
   const headingDeg = angleRad * (180 / Math.PI); // Convert Radians to Degrees for CSS consumption
   \`\`\`

---

## 5. Unified Dashboard Metric Architecture
The primary Dashboard grid groups data logically:

- **Active Logic**: \`vessel.status === 'MOVING' || vessel.speed > 0\`
- **Idle Logic**: \`vessel.speed === 0 && (Date.now() - vessel.lastPing) < 5 minutes\`
- **Offline Logic**: \`(Date.now() - vessel.lastPing) > 5 minutes\` (Signal loss or engine off)
- **Fleet Utilization**: \`Math.round((activeVessels / totalVessels) * 100)\`

---

## 6. Vessel Analytics & Intelligence (Recharts)
The deeper \`/analytics\` graphing components process large chronological arrays mathematically via \`recharts\`.

### Aggregation Formulas
- **Distance Traversing (Haversine Formula)**: Every physical ping processed from hardware uses the spherical Haversine formula to count distance accurately accounting for planetary curvature (Earth Radius = 6371km):
  \`\`\`javascript
  a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  c = 2 ⋅ atan2( √a, √(1−a) )
  distance = R ⋅ c
  \`\`\`
  This determines the precise distance traveled on the `Distance Over Time` line chart.
- **Idle vs Moving Ratios (PieChart)**: Scans historical logs, summing \`(Total Time spent where speed > 2kn)\` vs \`(Total Time spent with speed < 2kn but Engine On)\`.
- **Trip Duration Averages**: Averages \`(trip.end_time - trip.start_time)\` partitioned by 24-hour groups to visualize patterns in schedule routing.

---

## 7. Relational Backend & Telemetry Logic (Prisma)
The backend intercepts UDP/WebSocket telemetry from ESP32 GPS trackers.

### Intelligent Trip Detection Logic
A continuous daemon worker scans incoming timestamps:
1. **Start Trigger**: If vessel speed transitions from \`0\` -> \`> 3 knots\` AND geographic displacement covers `> 50 meters`, a new row is explicitly spawned in the \`Trip\` table natively.
2. **Stop Trigger**: If the speed drops to \`0\` and stays at \`0\` for *more than 15 consecutive minutes*, the \`Trip\` state is closed and committed asynchronously.
3. **Alert Triggers**: If geographic constraint rules (Geofencing) are breached, the engine synchronously injects rows into the \`VesselAlert\` feed (e.g., \`BOUNDARY_EXIT\` or \`GPS_SPOOFING\`).

---

## 8. Automated Presentation Scraper
To assist stakeholders in documenting the UI layouts seamlessly:

- **Puppeteer Headless Engine**: A headless Chromium instance sequentially parses 8 dashboard URLs (`/fleet`, `/track`, `/analytics` etc.).
- **Asynchronous Math**: 
  \`await new Promise(r => setTimeout(r, 2500));\`
  The script mathematically limits capture execution specifically by waiting 2.5 seconds per route—granting precise headroom for MapTiler WebGL chunks, Recharts SVG drawings, and CSS 3D bounding boxes to finish hydrating and compiling, before committing a physical \`fullPage\` viewport snap.
