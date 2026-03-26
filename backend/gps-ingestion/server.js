const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('etag', false);


// Disable caching globally
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// Global in-memory storage
let gpsLogs = [];

// POST GPS telemetry
app.post("/api/gps", (req, res) => {
    console.log("\n📥 ========= INCOMING GPS REQUEST =========");
    console.log("📥 Content-Type:", req.headers["content-type"]);
    console.log("📥 Raw body:", JSON.stringify(req.body));

    const data = req.body;

    // Check if body is empty
    if (!data || Object.keys(data).length === 0) {
        console.log("❌ ERROR: Request body is empty or not parsed!");
        return res.status(400).json({ status: "error", message: "Empty request body. Make sure Content-Type is application/json" });
    }

    // Check required fields
    const requiredFields = ["utc_datetime", "latitude", "longitude"];
    const missing = requiredFields.filter(f => data[f] === undefined);
    if (missing.length > 0) {
        console.log("❌ ERROR: Missing fields:", missing);
        return res.status(400).json({ status: "error", message: "Missing fields", missing });
    }

    // Store the data
    const logEntry = {
        received_at: new Date().toISOString(),
        utc_datetime: data.utc_datetime,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        altitude_m: Number(data.altitude_m || 0),
        speed_kmh: Number(data.speed_kmh || 0),
        heading_deg: Number(data.heading_deg || 0),
        satellites: Number(data.satellites || 0),
        hdop: Number(data.hdop || 0),
        fix_status: Number(data.fix_status || 0),
        prns: Array.isArray(data.prns) ? data.prns : [],
        snrs: Array.isArray(data.snrs) ? data.snrs : []
    };

    gpsLogs.push(logEntry);

    console.log("✅ GPS data stored:", JSON.stringify(logEntry, null, 2));
    console.log("📊 Total logs stored:", gpsLogs.length);
    console.log("========================================\n");

    res.json({ status: "success", stored_index: gpsLogs.length - 1 });
});

// GET all logs
app.get("/api/gps", (req, res) => {
    res.setHeader("ETag", "");
    res.json(gpsLogs);
});

// DELETE all logs
app.delete("/api/gps", (req, res) => {
    gpsLogs = [];
    console.log("🗑️ All GPS logs cleared");
    res.json({ status: "success", message: "All GPS logs cleared" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});