import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';


const SafeAreaLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toast />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {children}
            </SafeAreaView>
        </>
    )
}

export default SafeAreaLayoutWrapper