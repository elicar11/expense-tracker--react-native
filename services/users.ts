import { supabaseConfig } from "@/utils/supabase";
import { IUser } from "@/interfaces";

export const registerNew = async (payload: Partial<IUser>) => {
    try {
        // Insertion des Donnée vers Supabase
        const { data, error } = await supabaseConfig.auth.signUp({
            email: payload.email!,
            password: payload.password!,
        })

        if (error) {
            throw new Error(error.message)
        }

        // Insertion des Données vers la table user_profile
        const { data: profileData, error: profileError } = await supabaseConfig.from("user_profile").insert([
            {
                id: data?.user?.id,
                name: payload.name,
                email: payload.email
            },
        ])

        if (profileError) {
            throw new Error(profileError.message)
        }

        return {
            success: true,
            message: "User registered successfully"
        }

    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An error occured while registering user"
        }
    }
}

export const loginUser = async (payload: { email: string; password: string }) => {
    try {
        const { data, error } = await supabaseConfig.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        });

        if (error) throw new Error(error.message);

        const { data: profile, error: profileError } = await supabaseConfig
            .from("user_profile")
            .select("*")
            .eq("id", data.user.id)
            .single();

        if (profileError) throw new Error(profileError.message);

        return {
            success: true,
            message: "User logged successfully",
            data: profile 
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export const getCurrentUserSession = async () => {
    try {
        const session = await supabaseConfig.auth.getSession()
        const sessionData = session.data.session
        if (!sessionData) {
            return null
        }
        const email = sessionData.user.email
        const { data, error } = await supabaseConfig
            .from("user_profile")
            .select("*")
            .eq("email", email)
            .single();
        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        return null
    }
}

export const logoutUser = async () => {
    const { error } = await supabaseConfig.auth.signOut();
    if (error) throw error;
}