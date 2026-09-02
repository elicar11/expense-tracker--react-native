import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TransactionForm from '@/components/TransactionForm';
import { getTransactionById } from '@/services/transactions';
import { ITransaction } from '@/interfaces';
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';

const EditTransactionPage = () => {
    const { id } = useLocalSearchParams(); 
    const [transaction, setTransaction] = useState<ITransaction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                const res = await getTransactionById(Number(id));
                if (res.success) {
                    setTransaction(res.data);
                }
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <SafeAreaLayoutWrapper>
            <TransactionForm 
                formType="edit" 
                initialData={transaction || undefined} 
            />
        </SafeAreaLayoutWrapper>
    );
};

export default EditTransactionPage;