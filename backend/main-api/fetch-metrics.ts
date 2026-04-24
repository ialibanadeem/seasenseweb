import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const today = new Date();
        today.setHours(0,0,0,0);

        const tripsToday = await prisma.trip.findMany({
            where: { createdAt: { gte: today } },
            include: { points: { orderBy: { timestamp: 'asc' } } }
        });

        let totalPoints = 0;
        let gaps = 0;
        const avgPingTimeMsList: number[] = [];
        
        let sosEvents = 0;
        try {
            const anyPrisma = prisma as any;
            if (anyPrisma.alert) {
                sosEvents = await anyPrisma.alert.count({ where: { createdAt: { gte: today } } });
            }
        } catch (e) {}

        tripsToday.forEach(trip => {
            totalPoints += trip.points.length;
            for (let i = 1; i < trip.points.length; i++) {
                const timeDiff = trip.points[i].timestamp.getTime() - trip.points[i-1].timestamp.getTime();
                if (timeDiff > 15000) gaps++; // Gap > 15s
                if (timeDiff > 0 && timeDiff < 60000) {
                     avgPingTimeMsList.push(timeDiff);
                }
            }
        });

        const avgPingTime = avgPingTimeMsList.length > 0 
              ? avgPingTimeMsList.reduce((a, b) => a + b, 0) / avgPingTimeMsList.length 
              : 0;

        console.log(JSON.stringify({
            tripsCount: tripsToday.length,
            totalPoints,
            significantGaps: gaps,
            avgPingFrequencySec: avgPingTime / 1000,
            sosCount: sosEvents
        }, null, 2));
    } catch (err) {
        console.error(err);
    }
}

main().finally(() => prisma.$disconnect());
