const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const promoDir = path.join(__dirname, 'promo_video');
if (!fs.existsSync(promoDir)) fs.mkdirSync(promoDir);

// Helper to simulate an ESP32 Hardware ping pushing into the backend router
function pingESP32(lat, lng, heading) {
    const data = JSON.stringify({
        latitude: lat,
        longitude: lng,
        speed_kmh: 18.5,
        heading_deg: heading,
        satellites: 9,
        fix_status: 1
    });

    const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/gps',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    });

    req.on('error', (e) => console.error("ESP32 Ping Failed: " + e.message));
    req.write(data);
    req.end();
}

(async () => {
    console.log('🚀 Launching Cinematographer Engine...');
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    
    // Create a new context with video recording enabled
    const context = await browser.newContext({
        recordVideo: { dir: promoDir, size: { width: 1920, height: 1080 } },
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    console.log('🎥 Action! Navigating to Dashboard...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

    // Start injecting simulated hardware pings
    let currentLat = 24.8143;
    let currentLng = 66.9806;
    
    const interval = setInterval(() => {
        currentLat -= 0.0005; // Move South
        currentLng -= 0.0005; // Move West
        pingESP32(currentLat, currentLng, 225); // heading south-west (225 deg)
    }, 1000);

    // Awwards style pacing
    console.log('🍿 Recording Dashboard Pan...');
    await page.waitForTimeout(5000); // Watch map settle and boat spawn/bounce
    
    // Smooth scroll down to grids
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
    await page.waitForTimeout(4000);
    
    // Navigate to Analytics
    console.log('🍿 Transitioning to Analytics...');
    await page.click('text=Analytics');
    await page.waitForTimeout(5000); // Watch Recharts animate

    // Navigate to Live Map
    console.log('🍿 Transitioning to Live Map Tracker...');
    await page.click('text=Live Map');
    await page.waitForTimeout(6000); 

    clearInterval(interval);

    await context.close(); // Automatically saves WebM/MP4
    await browser.close();
    
    console.log('✅ Promo video compiled successfully in /promo_video folder!');
})();
