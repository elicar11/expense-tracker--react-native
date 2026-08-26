import { IUser } from "@/interfaces";
import { getCurrentUserSession, logoutUser } from "@/services/users";
import { create } from "zustand";

export interface AuthState {
    checkingUserSession: boolean;
    checkUserSession: () => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    setCheckingSession: (status: boolean) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    checkingUserSession: true,
    checkUserSession: async () => {
        set({ checkingUserSession: true });
        const userResponse = await getCurrentUserSession();
        if (userResponse) {
            console.log("User session found :", userResponse)
            set({ user: userResponse })
        } else {
            set({ user: null })
        }
        set({
            checkingUserSession: false

        })
    },
    user: null,
    setUser: (payload) => set({ user: payload }),
    setCheckingSession: (status) => set({ checkingUserSession: status }),
    logout: async () => {
        try {
            await logoutUser(); // Appelle le service Supabase
            set({ user: null }); // Vide l'état de l'utilisateur
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
}))
