import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { RelativePathString, useRouter } from 'expo-router';
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';

const IndexScreen = () => {
  const router = useRouter();
  const checkAuthStatusAndNavigate = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push('/landing' as RelativePathString);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  useEffect(() => {
    checkAuthStatusAndNavigate();
  }, []);

  return (
    <SafeAreaLayoutWrapper>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Checking authentication status...</Text>
      </View>
    </SafeAreaLayoutWrapper>
  )

}




export default IndexScreen