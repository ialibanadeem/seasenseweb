const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}

const routes = [
    { name: '01_Dashboard', path: '/' },
    { name: '02_Vessel_List', path: '/fleet' },
    { name: '03_Live_Map', path: '/track' },
    { name: '04_Trip_History', path: '/trips' },
    { name: '05_Analytics', path: '/analytics' },
    { name: '06_Alerts', path: '/alerts' },
    { name: '07_Reports', path: '/reports' },
    { name: '08_Settings', path: '/settings' }
];

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
        headless: true, 
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    for (const route of routes) {
        console.log("Navigating to " + route.name + "...");
        await page.goto("http://localhost:3001" + route.path, { waitUntil: 'networkidle0', timeout: 60000 });
        
        // Wait an extra 2.5 seconds for MapTiler maps, Recharts animations, and 3D SVGs to fully settle
        await new Promise(r => setTimeout(r, 2500)); 

        const savePath = path.join(screenshotsDir, route.name + ".png");
        await page.screenshot({ path: savePath, fullPage: true });
        console.log("Saved: " + savePath);
    }

    await browser.close();
    console.log('All screenshots captured successfully!');
})();
