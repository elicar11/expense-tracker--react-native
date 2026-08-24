import { View, Text } from 'react-native'
import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'

const UserHomepage = () => {
    return (
        <SafeAreaLayoutWrapper>
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <Text>UserHomepage</Text>
            </View>
        </SafeAreaLayoutWrapper>
    )
}

export default UserHomepage