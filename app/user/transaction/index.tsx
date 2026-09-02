import { View, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import Title from '@/components/Title'
import { Icon } from 'react-native-paper'
import { useRouter, useFocusEffect } from 'expo-router'
import { useAuthStore } from '@/store/auth-store'
import { getTransactionByUserId } from '@/services/transactions'
import Toast from 'react-native-toast-message'
import CardItem from '@/components/CardItem'
import { ITransaction } from '@/interfaces'

const TransactionScreen = () => {
    const [transactions, setTransactions] = React.useState<ITransaction[]>([])
    const [loading, setLoading] = React.useState(true)
    const { user } = useAuthStore()
    const router = useRouter()

    const fetchTransaction = async () => {
        if (!user?.id) return; // Sécurité si l'user n'est pas chargé

        try {
            setLoading(true)
            // Conversion de l'ID en string
            const response: any = await getTransactionByUserId(String(user.id))
            
            if (response.success) {
                setTransactions(response.data || [])
            } else {
                setTransactions([])
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'An error occurred while fetching transactions',
            })
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchTransaction();
        }, [user?.id])
    );

    const RenderHeader = () => (
        <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Icon source="arrow-left" size={24} color='black' />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Title title="Transactions" />
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.center}>
                <Title title="Loading..." />
            </View>
        )
    }

    return (
        <SafeAreaLayoutWrapper>
            {/* FlatList = ScrollView */}
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CardItem transaction={item}  onRefresh={fetchTransaction} />}
                ListHeaderComponent={RenderHeader}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.center}>
                        <Text>No transactions found.</Text>
                    </View>
                )}
            />
        </SafeAreaLayoutWrapper>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#f5f5f7" 
    },
    listContent: { 
        padding: 20, 
        paddingBottom: 40 
    },
    center: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 50 
    },
    headerRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    backButton: { 
        padding: 5 
    },
    titleContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 35 // Pour compenser la flèche et centrer le texte
    },
    input: { 
        backgroundColor: "white" 
    }
})

export default TransactionScreen