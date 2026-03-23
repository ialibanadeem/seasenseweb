import { create } from 'zustand';

export interface UserProfile {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    companyName: string | null;
    billingAddress: string | null;
    avatar: string | null;
    preferences: Record<string, any> | null;
}

interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;

    fetchProfile: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    isLoading: false,
    error: null,

    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const res = await fetch(`${apiURL}/users/profile`);
            if (!res.ok) throw new Error('Failed to fetch profile');
            const data = await res.json();
            set({ profile: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        set({ isLoading: true, error: null });
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const res = await fetch(`${apiURL}/users/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update profile');
            const updatedProfile = await res.json();
            set({ profile: updatedProfile, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            throw err;
        }
    },
}));
