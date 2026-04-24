const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const allowedTypes = [
        'Boundary Transition',
        'Signal Status',
        'Route Deviation',
        'Prolonged Inactivity',
        'Fleet Update',
        'SOS / Distress Signal'
    ];

    const count = await prisma.alert.deleteMany({
        where: {
            type: {
                notIn: allowedTypes
            }
        }
    });

    console.log(`Deleted ${count.count} legacy/mock alerts.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
