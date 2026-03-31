import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const vessels = await prisma.vessel.findMany({
    where: { deletedAt: null }
  });
  console.log('Current Vessels:');
  vessels.forEach(v => {
    console.log(`- ${v.name} (MMSI: ${v.mmsi}, ID: ${v.id})`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
