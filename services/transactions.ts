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
        const { error } = await supabaseConfig
            .from("transaction")
            .update({
                name: payload.name,
                amount: payload.amount,
                type: payload.type,
                description: payload.description,
                date: payload.date,
                category: payload.category,
            })
            .eq("id", transactionId);

        if (error) throw new Error(error.message);
        return { success: true, message: "Updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
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
            .order('created_at', { ascending: false });

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

export const getHomeData = async (userId: string) => {
    try {
        const { data, error } = await supabaseConfig
            .from("transaction")
            .select("*")
            .eq("user_id", userId)
            .order('created_at', { ascending: false }); 

        if (error) throw new Error(error.message);

        const transactions = data as ITransaction[];

        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            success: true,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            recentTransactions: transactions.slice(0, 5) 
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};