const dotenv = require('dotenv');
// Load environment variables IMMEDIATELY
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const gpsRoutes = require('./modules/gps/gps.routes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto; line-height: 1.6;">
            <h1 style="color: #0066cc;">📡 SeaSense GPS Server</h1>
            <p>The GPS Telemetry Ingestion Server is <strong>Operational</strong>.</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <h3>Available Endpoints:</h3>
            <ul>
                <li><a href="/health">/health</a> - System Status</li>
                <li><a href="/api/gps">/api/gps</a> - Recent Hardware Logs</li>
                <li><code>POST /api/gps</code> - Ingest Telemetry</li>
            </ul>
            <p style="font-size: 0.8rem; color: #888;">Hardware ID: <code>ESP32-HARDWARE</code></p>
        </div>
    `);
});

app.use('/api/gps', gpsRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'gps-telemetry-server' });
});

module.exports = app;
