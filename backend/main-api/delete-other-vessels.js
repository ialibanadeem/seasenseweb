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
    const shaheen = await prisma.vessel.findUnique({
      where: { mmsi: '987654321' }
    });

    if (!shaheen) {
      console.log('⚠️ Shaheen (987654321) not found. Aborting.');
      return;
    }

    const others = await prisma.vessel.findMany({
      where: { mmsi: { not: '987654321' } }
    });

    for (const v of others) {
      console.log(`🧹 Cleaning up: ${v.name} (MMSI: ${v.mmsi})`);
      
      // Delete all related records
      const vesselId = v.id;
      
      // Using a transaction to ensure atomic deletion
      await prisma.$transaction([
        prisma.alert.deleteMany({ where: { vesselId } }),
        prisma.activityTimeline.deleteMany({ where: { vesselId } }),
        prisma.gpsLog.deleteMany({ where: { vesselId } }),
        prisma.locationPoint.deleteMany({ where: { trip: { vesselId } } }),
        prisma.tripStatusHistory.deleteMany({ where: { trip: { vesselId } } }),
        prisma.trip.deleteMany({ where: { vesselId } }),
        prisma.vessel.delete({ where: { id: vesselId } })
      ]);
      
      console.log(`✅ Deleted ${v.name}`);
    }

    console.log('✨ Database cleanup complete. Only Shaheen remains.');
  } catch (e) {
    console.error('❌ Deletion failed:', e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
