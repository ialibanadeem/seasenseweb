import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isInitialized: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    initialize: () => void;
}

const AUTH_COOKIE_NAME = 'seasense_auth_token';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isInitialized: false,

    login: (token: string, user: User) => {
        // Save token to cookie with 1 day expiration and strict same-site controls
        Cookies.set(AUTH_COOKIE_NAME, token, { expires: 1, sameSite: 'strict', path: '/' });
        
        // Also persist user data in localStorage so we don't have to fetch it on initial load
        if (typeof window !== 'undefined') {
            localStorage.setItem('seasense_user', JSON.stringify(user));
        }

        set({ token, user, isInitialized: true });
    },

    logout: () => {
        Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
        
        if (typeof window !== 'undefined') {
            localStorage.removeItem('seasense_user');
        }

        set({ user: null, token: null });
        
        // Hard redirect to clear any lingering client-side state
        window.location.href = '/login';
    },

    initialize: () => {
        if (typeof window === 'undefined') return;

        const token = Cookies.get(AUTH_COOKIE_NAME);
        const userStr = localStorage.getItem('seasense_user');
        
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr) as User;
                set({ token, user, isInitialized: true });
            } catch (e) {
                // Ignore parse errors and leave unauthenticated
                set({ isInitialized: true });
            }
        } else {
            set({ isInitialized: true });
        }
    }
}));
