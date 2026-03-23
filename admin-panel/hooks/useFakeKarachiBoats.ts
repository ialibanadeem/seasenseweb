import { useEffect } from 'react';
import { useVesselStore } from '../store/useVesselStore';

const KEMARI = [66.9806, 24.8143];
const MANORA = [66.9744, 24.7954];
const CHURNA = [66.5960, 24.8966];

function getInterpolatedPoint(start: number[], end: number[], progress: number) {
    return [
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress
    ];
}

export const useFakeKarachiBoats = () => {
    const updateLivePosition = useVesselStore(state => state.updateLivePosition);

    useEffect(() => {
        let progress1 = 0;
        let progress2 = 0;
        let dir1 = 1;
        let dir2 = 1;

        const interval = setInterval(() => {
            progress1 += (0.01 * dir1); // Faster trip to Manora
            progress2 += (0.003 * dir2); // Slower trip to Churna

            if (progress1 >= 1) { progress1 = 1; dir1 = -1; }
            if (progress1 <= 0) { progress1 = 0; dir1 = 1; }
            if (progress2 >= 1) { progress2 = 1; dir2 = -1; }
            if (progress2 <= 0) { progress2 = 0; dir2 = 1; }

            const pos1 = getInterpolatedPoint(KEMARI, MANORA, progress1);
            const pos2 = getInterpolatedPoint(KEMARI, CHURNA, progress2);

            const heading1 = dir1 === 1 ? 190 : 10;
            const heading2 = dir2 === 1 ? 285 : 105;

            updateLivePosition({
                vesselId: 'VES_MANORA',
                latitude: pos1[1],
                longitude: pos1[0],
                speed: 15.0,
                heading: heading1,
                timestamp: new Date().toISOString(),
                status: 'ACTIVE',
                is3D: true // Flag to render as 3D boat
            } as any);

            updateLivePosition({
                vesselId: 'VES_CHURNA',
                latitude: pos2[1],
                longitude: pos2[0],
                speed: 32.5,
                heading: heading2,
                timestamp: new Date().toISOString(),
                status: 'ACTIVE',
                is3D: true 
            } as any);

        }, 1000);

        return () => clearInterval(interval);
    }, [updateLivePosition]);
};
