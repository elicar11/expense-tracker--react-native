import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { ITransaction } from '@/interfaces'
import { Icon, Button, Divider } from 'react-native-paper'
import dayjs from 'dayjs'
import { RelativePathString, useRouter } from 'expo-router'
import { deleteTransactionById } from '@/services/transactions'
import Toast from 'react-native-toast-message'

// prop onRefresh pour recharger la liste après suppression
const CardItem = ({ transaction, onRefresh }: { transaction: ITransaction, onRefresh: () => void }) => {
    const [expanded, setExpanded] = useState(false);
    const isIncome = transaction.type === 'income';
    const styleDetails = getCategoryStyle(transaction.category || "");
    const router = useRouter();

    // Fonction de suppression avec confirmation
    const handleDelete = () => {
        Alert.alert(
            "Delete Transaction",
            "Are you sure you want to delete this transaction?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const res = await deleteTransactionById(transaction.id);
                        if (res.success) {
                            Toast.show({ type: 'success', text1: 'Deleted successfully' });
                            onRefresh();
                        } else {
                            Toast.show({ type: 'error', text1: res.message });
                        }
                    }
                }
            ]
        );
    };

    // Redirection vers le formulaire en mode édition
    const handleEdit = () => {
        // Syntaxe pour passer des paramètres via expo-router
        router.push({
            pathname: `/user/edit-transaction/${transaction.id}` as RelativePathString,
            params: {
                id: transaction.id,
                name: transaction.name,
                amount: transaction.amount.toString(), 
                type: transaction.type,
                category: transaction.category,
                description: transaction.description,
                date: transaction.date
            }
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpanded(!expanded)}
            style={styles.cardContainer}
        >
            <View style={styles.mainRow}>
                <View style={[styles.iconBox, { backgroundColor: styleDetails.bgColor }]}>
                    <Icon source={styleDetails.icon} size={24} color={styleDetails.color} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.transactionName} numberOfLines={1}>
                        {transaction.name}
                    </Text>
                    <Text style={styles.transactionDetails}>
                        {transaction.category} • {dayjs(transaction.date).format('MMM D, YYYY')}
                    </Text>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={[
                        styles.amountText,
                        { color: isIncome ? '#2E7D32' : '#e60d0d' }
                    ]}>
                        {isIncome ? `+${transaction.amount.toFixed(2)}` : `-${transaction.amount.toFixed(2)}`}
                    </Text>
                </View>
            </View>

            {expanded && (
                <View style={styles.expandedSection}>
                    <Divider style={styles.divider} />

                    {transaction.description ? (
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionTitle}>Description:</Text>
                            <Text style={styles.descriptionText}>{transaction.description}</Text>
                        </View>
                    ) : null}

                    <View style={styles.actionButtons}>
                        <Button
                            mode="contained-tonal"
                            onPress={handleEdit}
                            icon="pencil"
                            buttonColor="#f3f3f3"
                            textColor="#1d1d1f"
                            style={styles.btn}
                        >
                            Edit
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleDelete}
                            icon="trash-can"
                            buttonColor="#ffe5e5"
                            textColor="#e60d0d"
                            style={styles.btn}
                        >
                            Delete
                        </Button>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    switch (cat) {
        case 'utilities': return { icon: 'flash', color: '#af52de', bgColor: '#f3e8ff' };
        case 'transport': return { icon: 'car', color: '#007aff', bgColor: '#e1f5ff' };
        case 'food': return { icon: 'coffee', color: '#ff9500', bgColor: '#fff2e0' };
        case 'income': return { icon: 'trending-up', color: '#34c759', bgColor: '#e2f9e9' };
        case 'shopping': return { icon: 'shopping', color: '#ff3b30', bgColor: '#ffe5e5' };
        default: return { icon: 'cash', color: '#8e8e93', bgColor: '#f2f2f7' };
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginLeft: 16,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d1d1f',
        marginBottom: 4,
    },
    transactionDetails: {
        fontSize: 13,
        color: '#8e8e93',
        textTransform: 'capitalize',
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        fontWeight: '800',
    },
    expandedSection: {
        marginTop: 10,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    descriptionBox: {
        marginBottom: 15,
    },
    descriptionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8e8e93',
        marginBottom: 2,
    },
    descriptionText: {
        fontSize: 14,
        color: '#4a4a4a',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    btn: {
        flex: 1,
        borderRadius: 10,
    }
})

export default CardItem