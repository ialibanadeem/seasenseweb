const axios = require('axios');

async function test() {
    const coords = [
        { lat: 24.8608, lon: 67.0104, name: 'Karachi Inland (Current)' },
        { lat: 24.75, lon: 66.95, name: 'Karachi Coast 1' },
        { lat: 24.6, lon: 66.8, name: 'Karachi Deep Sea' }
    ];

    for (const c of coords) {
        const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${c.lat}&longitude=${c.lon}&current=wave_height,sea_surface_temperature&hourly=wave_height&cell_selection=nearest`;
        try {
            const res = await axios.get(url);
            console.log(`\n--- ${c.name} ---`);
            console.log(`Wave Height:`, res.data.current.wave_height);
            console.log(`Hourly Waves:`, res.data.hourly.wave_height.slice(0, 5));
        } catch(e) {
            console.log(`Error on ${c.name}:`, e.message);
        }
    }
}

test();
