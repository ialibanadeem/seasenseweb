const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const sequenceIds = [21, 22];
  console.log(`Deleting trips with sequence IDs: ${sequenceIds.join(', ')}...`);
  
  // Delete associated points first (cascade should also handle this if configured, but safe to be explicit)
  const trips = await prisma.trip.findMany({
    where: { sequenceId: { in: sequenceIds } }
  });
  
  const tripIds = trips.map(t => t.id);
  
  if (tripIds.length > 0) {
    const pointsResult = await prisma.locationPoint.deleteMany({
      where: { tripId: { in: tripIds } }
    });
    console.log(`Deleted ${pointsResult.count} points.`);
    
    const tripsResult = await prisma.trip.deleteMany({
      where: { id: { in: tripIds } }
    });
    console.log(`Deleted ${tripsResult.count} trips.`);
  } else {
    console.log('No trips found with these sequence IDs.');
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
