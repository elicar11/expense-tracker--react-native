import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const SafeAreaLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaLayoutWrapper