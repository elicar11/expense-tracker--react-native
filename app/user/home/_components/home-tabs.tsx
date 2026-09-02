import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Link, RelativePathString, useFocusEffect } from 'expo-router'
import { Icon } from 'react-native-paper'
import { useAuthStore } from '@/store/auth-store'
import { getHomeData } from '@/services/transactions'
import CardItem from '@/components/CardItem'
import { ITransaction } from '@/interfaces'

const HomeTabs = () => {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        balance: 0,
        income: 0,
        expense: 0,
        recent: [] as ITransaction[]
    });

    const fetchData = async () => {
        if (!user?.id) return;
        const res = await getHomeData(String(user.id));
        if (res.success) {
            setStats({
                balance: res.balance || 0,
                income: res.totalIncome || 0,
                expense: res.totalExpense || 0,
                recent: res.recentTransactions || []
            });
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [user?.id])
    );

    if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#4C4DDC" />;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.userRow}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{user?.name?.substring(0, 2).toUpperCase()}</Text>
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.greeting}>Hello,</Text>
                            <Text style={styles.userName}>{user?.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceValue}>{stats.balance.toLocaleString()}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Icon source="trending-up" size={20} color="white" />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>INCOME</Text>
                            <Text style={styles.statValue}>+ {stats.income}</Text>
                        </View>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Icon source="trending-down" size={20} color="white" />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>EXPENSE</Text>
                            <Text style={styles.statValue}>- {stats.expense}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <Link href={"/user/transaction" as RelativePathString}>
                        <Text style={styles.seeAll}>See All</Text>
                    </Link>
                </View>

                {stats.recent.map((item) => (
                    <CardItem key={item.id} transaction={item} onRefresh={fetchData} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f7" },
    header: {
        backgroundColor: "#000",
        paddingTop: 60,
        paddingHorizontal: 25,
        paddingBottom: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    userRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white'
    },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    greeting: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
    userName: { color: 'white', fontSize: 20, fontWeight: '700' },
    bellBtn: {
        width: 45, height: 45, borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center'
    },
    balanceContainer: { alignItems: 'center', marginTop: 30 },
    balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
    balanceValue: { color: 'white', fontSize: 42, fontWeight: '800', marginTop: 5 },
    statsRow: { flexDirection: 'row', gap: 15, marginTop: 35 },
    statCard: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 15, borderRadius: 20, gap: 10
    },
    statIcon: { width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '700' },
    statValue: { color: 'white', fontSize: 16, fontWeight: '700' },
    content: { padding: 25 },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1d1d1f' },
    seeAll: { color: '#020206', fontWeight: '600', textDecorationLine: 'underline' }
})

export default HomeTabs;