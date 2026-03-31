const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const trips = await prisma.trip.findMany({
    where: { 
      sequenceId: { in: [21, 22] } 
    },
    include: {
      vessel: true,
      points: {
        orderBy: { timestamp: 'asc' },
        take: 1, // Start point
      }
    }
  });

  const tripsWithEnds = await Promise.all(trips.map(async (t) => {
    const lastPoint = await prisma.locationPoint.findFirst({
      where: { tripId: t.id },
      orderBy: { timestamp: 'desc' }
    });
    return { ...t, lastPoint };
  }));

  console.log('Inspection of Trips 21 & 22:');
  console.log(JSON.stringify(tripsWithEnds, null, 2));
}

main().catch(console.error).finally(() => {
    prisma.$disconnect();
    pool.end();
});
