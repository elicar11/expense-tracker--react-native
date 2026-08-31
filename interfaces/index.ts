export interface IUser {
    id: number,
    name: string,
    email: string,
    password?: string,
    profile_picture?: string,
    created_at: string
}

export interface ITransaction{
    id: number,
    name: string,
    amount: number,
    type: 'income' | 'expense',
    description: string,
    date: string,
    category?: string,
    user_id: number,
    created_at: string
}