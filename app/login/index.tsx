import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';


const LoginScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaLayoutWrapper>
            <Text>LoginScreen</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
        </SafeAreaLayoutWrapper>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        color: "white",
    }

})