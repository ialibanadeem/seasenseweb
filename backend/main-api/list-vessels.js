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
    const vessels = await prisma.vessel.findMany({
      where: { deletedAt: null }
    });
    console.log('Current Vessels:');
    vessels.forEach(v => {
      console.log(`- ${v.name} (MMSI: ${v.mmsi}, ID: ${v.id})`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
