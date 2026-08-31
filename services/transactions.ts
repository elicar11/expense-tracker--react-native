import { supabaseConfig } from "@/utils/supabase";
import { ITransaction } from "@/interfaces";

export const addTransaction = async (payload: Partial<ITransaction>) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .insert([
                {
                    name: payload.name,
                    amount: payload.amount,
                    type: payload.type,
                    description: payload.description,
                    date: payload.date,
                    category: payload.category,
                    user_id: payload.user_id,
                }
            ])

        if (error) {
            throw new Error(error.message)
        }

        return {
            success: true,
            message: "Transactiion added successfully "
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occured while adding transaction"
        }
    }
};

export const editTransactionById = async ({
    transactionId,
    payload,
}: {
    transactionId: number,
    payload: Partial<ITransaction>
}) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .update([
                {
                    amount: payload.amount,
                    type: payload.type,
                    description: payload.description,
                    date: payload.date,
                    category: payload.category,
                    user_id: payload.user_id,
                }
            ])
            .eq("id", transactionId)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return {
            success: true,
            message: "Transactiion updated successfully "
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occured while updating transaction"
        }
    }
};

export const deleteTransactionById = async (transactionId: number) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .delete()
            .eq("id", transactionId)

        if (error) {
            throw new Error(error.message)
        }

        return {
            success: true,
            message: "Transactiion deleted successfully "
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occured while deleting transaction"
        }
    }
};

export const getTransactionByUserId = async (userId: string) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .select("*")
            .eq("user_id", userId)

        if (error) {
            throw new Error(error.message)
        }

        return {
            success: true,
            message: "Transactiion retrieved successfully ",
            data: data as ITransaction[],
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occured while retrieving transaction"
        }
    }
};

export const getTransactionById = async (transactionId: number) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .select("*")
            .eq("id", transactionId)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return {
            success: true,
            message: "Transactiion retrieved successfully ",
            data: data as ITransaction,
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occured while retrieving transaction"
        }
    }
};