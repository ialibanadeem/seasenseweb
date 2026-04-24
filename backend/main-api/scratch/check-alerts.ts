import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const alerts = await prisma.alert.findMany({
        include: { vessel: true },
        orderBy: { timestamp: 'desc' }
    });
    console.log(JSON.stringify(alerts, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
