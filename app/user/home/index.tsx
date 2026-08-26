import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import { useAuthStore } from '@/store/auth-store'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'

const UserHomepage = () => {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/landing");
    };

    return (
        <SafeAreaLayoutWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, {user?.name ?? "User"}</Text>
                <Text style={styles.subtitle}>Email: {user?.email ?? "Not provided"}</Text>
                
                <View style={{ marginTop: 20, width: '100%' }}>
                    <CustomButton 
                        title='Logout' 
                        onPress={handleLogout} 
                    />
                </View>
            </View>
        </SafeAreaLayoutWrapper>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        padding: 20 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10
    }
})

export default UserHomepage