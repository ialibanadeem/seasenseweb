const express = require('express');
const {
    ingestData,
    getLatestPosition,
    getHistory,
    getStats,
    deleteAllLogs
} = require('./gps.controller');

const router = express.Router();

/**
 * Legacy Compatibility & Smart GET Ingestion
 * GET /api/gps -> returns history OR ingests data if query params present
 */
router.get('/', getHistory);

/**
 * Public Ingestion
 * POST /api/gps
 */
router.post('/', ingestData);

/**
 * Advanced Reporting
 */
router.get('/latest/:mmsi', getLatestPosition);
router.get('/history/:mmsi', getHistory);
router.get('/stats', getStats);
router.delete('/', deleteAllLogs);

module.exports = router;
