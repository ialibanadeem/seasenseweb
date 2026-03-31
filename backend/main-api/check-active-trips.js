const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function main() {
  const url = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const activeTrips = await prisma.trip.findMany({
      where: { status: 'ACTIVE' },
      include: { 
        vessel: true,
        points: {
          orderBy: { timestamp: 'desc' },
          take: 5
        }
      }
    });

    console.log(`📡 Current Active Trips: ${activeTrips.length}`);
    activeTrips.forEach(t => {
      console.log(`\n🚢 Vessel: ${t.vessel.name} (MMSI: ${t.vessel.mmsi})`);
      console.log(`   Trip ID: ${t.id} | Started: ${t.startTime}`);
      console.log(`   Last 5 Points:`);
      t.points.forEach(p => {
        console.log(`   - Lat: ${p.latitude}, Lng: ${p.longitude} | Spd: ${p.speed?.toFixed(2)} kn | Time: ${p.timestamp}`);
      });
    });

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
