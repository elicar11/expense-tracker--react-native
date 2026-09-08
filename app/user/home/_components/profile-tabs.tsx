import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'expo-router'
import { Icon, Divider } from 'react-native-paper'
import ProfileMenuItem from '@/components/ProfileMenuItem'

const ProfileTabs = () => {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to exit?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await logout();
                    router.replace("/landing");
                }
            }
        ]);
    };

    return (
        <SafeAreaLayoutWrapper>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.userName}>{user?.name ?? "User"}</Text>
                    <Text style={styles.userEmail}>{user?.email ?? "Not provided"}</Text>
                </View>

                <View style={styles.menuSection}>

                    <ProfileMenuItem
                        icon="account-outline"
                        title="Edit Profile"
                        onPress={() => router.push("/user/profile/edit" as any)}
                    />
                    <ProfileMenuItem
                        icon="history"
                        title="Transaction History"
                        onPress={() => router.push("/user/transaction" as any)}
                    />

                    <ProfileMenuItem
                        icon="information-outline"
                        title="About App"
                        onPress={() => router.push("/user/profile/about" as any)}
                    />
                </View>

                <View style={styles.logoutSection}>
                    <ProfileMenuItem
                        icon="logout"
                        title="Logout"
                        onPress={handleLogout}
                        color="#e60d0d"
                    />
                </View>

            </ScrollView>
        </SafeAreaLayoutWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
    },
    header: {
        alignItems: 'center',
        paddingVertical: 140,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        elevation: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        color: 'white',
        fontSize: 40,
        fontWeight: '800',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1d1d1f',
    },
    userEmail: {
        fontSize: 14,
        color: '#8e8e93',
        marginTop: 4,
    },
    editBadge: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    editBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'black',
    },
    menuSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#8e8e93',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: 5,
    },
    logoutSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    }
})

export default ProfileTabs