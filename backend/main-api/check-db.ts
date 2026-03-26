import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const vessels = await prisma.vessel.findMany();
  console.log(JSON.stringify(vessels, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
