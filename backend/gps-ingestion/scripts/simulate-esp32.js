const http = require('http');

/**
 * ESP32 Simulation Script (No Dependencies)
 * This script emulates the hardware sending GPS telemetry to the ingestion server.
 * USES HARDWARE DATE FORMAT: YYMMDD.HHMMSS
 */

const VESSEL_ID = 'cb702539-878e-4679-a3c9-d165d0bafcd7'; // Test Vessel 001
const HOST = 'localhost';
const PORT = 3005;
const PATH = '/api/gps';

// Karachi Marina Coordinates
let lat = 24.8105;
let lng = 66.9904;
let speed = 5.0;
let heading = 120;

function formatHardwareDate(date) {
    const yy = date.getUTCFullYear().toString().slice(-2);
    const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const dd = date.getUTCDate().toString().padStart(2, '0');
    const hh = date.getUTCHours().toString().padStart(2, '0');
    const min = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${yy}${mm}${dd}.${hh}${min}${ss}`;
}

function sendUpdate() {
    // Wander slightly
    lat += (Math.random() - 0.5) * 0.001;
    lng += (Math.random() - 0.5) * 0.001;
    speed = 5.0 + Math.random() * 15;
    heading = (heading + (Math.random() - 0.5) * 10) % 360;

    const payload = JSON.stringify({
        mmsi: VESSEL_ID,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
        speed_kmh: speed.toFixed(1),
        heading_deg: Math.round(heading),
        utc_datetime: formatHardwareDate(new Date()),
        satellites: 8,
        fix_status: 1
    });

    const options = {
        hostname: HOST,
        port: PORT,
        path: PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log(`✅ [${new Date().toLocaleTimeString()}] Telemetry Sent: ${lat.toFixed(4)}, ${lng.toFixed(4)} | Speed: ${speed.toFixed(1)} km/h`);
            } else {
                console.error(`❌ Server returned ${res.statusCode}: ${body}`);
            }
        });
    });

    req.on('error', (error) => {
        console.error(`❌ Connection Error: ${error.message}`);
    });

    req.write(payload);
    req.end();
}

console.log('🚀 Starting ESP32 Simulation...');
console.log(`📡 Targeting: http://${HOST}:${PORT}${PATH}`);
console.log(`🛥️ Vessel ID: ${VESSEL_ID}`);
console.log('----------------------------------------');

// Send every 5 seconds
setInterval(sendUpdate, 5000);
sendUpdate();
