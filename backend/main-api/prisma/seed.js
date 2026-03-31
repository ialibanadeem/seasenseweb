
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');
    
    // 1. Create ADMIN role
    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: { name: 'ADMIN' },
    });
    console.log('✅ Admin Role created');

    // 2. Create the real-time Vessel "Shaheen"
    const vessel = await prisma.vessel.upsert({
        where: { mmsi: '987654321' },
        update: {},
        create: {
            name: 'Shaheen',
            mmsi: '987654321', 
            imo: 'IMO9876543',
            type: 'FISHING',
        },
    });
    console.log('✅ Vessel Shaheen created:', vessel.name);
}

main()
    .catch((e) => {
        console.error('Seeding Error:', e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
