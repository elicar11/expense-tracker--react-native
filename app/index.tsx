import { View } from 'react-native'
import React, { useEffect } from 'react'
import { RelativePathString, useRouter } from 'expo-router';
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';
import { ActivityIndicator } from 'react-native-paper';
import { useAuthStore } from '@/store/auth-store';


const IndexScreen = () => {
  const router = useRouter();
  const { checkingUserSession, user, checkUserSession } = useAuthStore()
  // const checkAuthStatusAndNavigate = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     router.push('/landing' as RelativePathString);
  //   } catch (error) {
  //     console.error('Error checking auth status:', error);
  //   }
  // }

  // useEffect(() => {
  //   checkAuthStatusAndNavigate();
  // }, []);

  useEffect(() => {
    checkUserSession();
  }, []);

  useEffect(() => {
    if (!checkingUserSession && !user) {
      router.replace("/landing" as RelativePathString)
    }
  }, [checkingUserSession, user])

  return (
    <SafeAreaLayoutWrapper>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </SafeAreaLayoutWrapper>
  )

}




export default IndexScreen