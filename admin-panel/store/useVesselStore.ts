import { create } from 'zustand';
import { Vessel, VesselLiveUpdate, SosTriggerPayload } from '../types/tracking';

interface VesselState {
    vessels: Record<string, Vessel>;
    livePositions: Record<string, VesselLiveUpdate>;
    liveTrails: Record<string, VesselLiveUpdate[]>; // Updated: Added trails
    selectedVesselId: string | null;
    activeEmergency: SosTriggerPayload | null;

    setVessels: (vessels: Vessel[]) => void;
    updateLivePosition: (update: VesselLiveUpdate) => void;
    selectVessel: (id: string | null) => void;
    setEmergency: (emergency: SosTriggerPayload | null) => void;
    clearEmergency: () => void;
}

export const useVesselStore = create<VesselState>((set) => ({
    vessels: {},
    livePositions: {},
    liveTrails: {}, // Initial state for trails
    selectedVesselId: null,
    activeEmergency: null,

    setVessels: (vessels) => {
        const vesselMap = vessels.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});
        set({ vessels: vesselMap });
    },

    updateLivePosition: (update) => {
        set((state) => {
            const currentTrail = state.liveTrails[update.vesselId] || [];
            
            // Retains up to 10,000 pings (~17 hours of continuous data) to show the COMPLETE path footprint without disappearing,
            // while still capping it safely to prevent eventual browser memory leaks.
            const newTrail = [...currentTrail, update].slice(-10000);
            
            return {
                livePositions: {
                    ...state.livePositions,
                    [update.vesselId]: update,
                },
                liveTrails: {
                    ...state.liveTrails,
                    [update.vesselId]: newTrail,
                },
            };
        });
    },

    selectVessel: (id) => set({ selectedVesselId: id }),
    setEmergency: (emergency) => set({ activeEmergency: emergency }),
    clearEmergency: () => set({ activeEmergency: null }),
}));
