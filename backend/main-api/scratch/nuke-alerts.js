const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const alerts = await prisma.alert.findMany();
    console.log(`Found ${alerts.length} total alerts.`);
    
    const count = await prisma.alert.deleteMany({});
    console.log(`Deleted ${count.count} alerts. DB is now clean.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
