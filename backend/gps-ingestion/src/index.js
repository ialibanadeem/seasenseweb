const app = require('./app');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log('========================================');
    console.log('📡 GPS Telemetry Server v1.0 (CommonJS)');
    console.log(`🚀 Running at: http://localhost:${PORT}`);
    console.log(`🔗 Ingestion: POST http://localhost:${PORT}/api/gps`);
    console.log('========================================');
});
