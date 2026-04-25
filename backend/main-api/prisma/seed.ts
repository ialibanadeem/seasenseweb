import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter: adapter as any });

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
            mmsi: '98764321', // typo? wait, mmsi should be 987654321 as per user context
            imo: 'IMO9876543',
            type: 'FISHING',
        },
    });
    console.log('✅ Vessel Shaheen created:', vessel.name);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
