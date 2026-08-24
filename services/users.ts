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


export const loginUser = async (payload:({
    email: string;
    password: string;
})) => {
    try {
        const { data, error} = await supabaseConfig.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })

        if (error){
            throw new Error(error.message)
        }
        return{
            success: true,
            message: "User logged successfully",
            data: data
        }
    } catch (error) {
        throw error;
    }
}