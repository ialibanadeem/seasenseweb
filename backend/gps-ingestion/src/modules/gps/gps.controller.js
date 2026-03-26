const gpsService = require('./gps.service');

/**
 * Smart Ingestion Handler (Unified)
 * Supports POST (JSON Body) and GET (Query Parameters)
 */
const ingestData = async (req, res) => {
    try {
        // Support both POST (body) and GET (query)
        const data = Object.keys(req.body).length > 0 ? req.body : req.query;

        // Basic validation: must have some positional data
        if (!data.latitude && !data.lat) {
            // If no data, but just a status check, don't log as error
            if (Object.keys(data).length === 0) {
                return res.status(200).json({ status: 'ok', message: 'Ingestion endpoint active' });
            }
            console.warn('⚠️ Ingestion rejected: No positional data found', data);
            return res.status(400).json({ status: 'error', message: 'No GPS data found in payload' });
        }

        console.log(`📥 Ingesting data via ${req.method}:`, data);

        const log = await gpsService.storeGpsLog(data);

        res.status(201).json({
            status: 'success',
            data: log
        });
    } catch (error) {
        console.error('❌ GPS Ingestion Error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Get latest position
 */
const getLatestPosition = async (req, res) => {
    try {
        const { mmsi } = req.params;
        const position = await gpsService.getLatestPosition(mmsi);

        if (!position) {
            return res.status(404).json({
                status: 'error',
                message: 'No position found for this vessel'
            });
        }

        res.json({
            status: 'success',
            data: position
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Get historical logs
 */
const getHistory = async (req, res) => {
    try {
        // If query parameters are present, redirect to ingestion (for simple GET hardware)
        if (req.query.latitude || req.query.lat) {
            return ingestData(req, res);
        }

        // Default to hardware profile if no specific MMSI requested (Legacy compatibility)
        const mmsi = req.params.mmsi || 'ESP32-HARDWARE';
        const limit = req.query.limit || 50;

        const history = await gpsService.getHistory(mmsi, limit);

        res.json({
            status: 'success',
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Get system stats
 */
const getStats = async (req, res) => {
    try {
        const stats = await gpsService.getStats();
        res.json({
            status: 'success',
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Maintenance: Clear logs
 */
const deleteAllLogs = async (req, res) => {
    try {
        await gpsService.clearAllLogs();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    ingestData,
    getLatestPosition,
    getHistory,
    getStats,
    deleteAllLogs
};
