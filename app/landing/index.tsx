import { View, StyleSheet, Image } from 'react-native'
import { Link, RelativePathString, useRouter } from 'expo-router'
import { Text } from 'react-native-paper'
import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import CustomButton from '@/components/CustomButton'


const LandingScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaLayoutWrapper>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require('@/assets/images/SplashScreen.png')}
            style={{ width: 400, height: 320 }}
          />
          <Text style={{ color: "#1d1d1f", fontSize: 50, fontWeight: 900, textAlign: 'center' }}>Xpense</Text>
          <Text style={{ color: "#766363", fontSize: 16, fontWeight: 500, marginTop: 10, textAlign: 'center' }}>Track your expenses with ease</Text>
        </View>
        <View style={styles.button}>
          <CustomButton title='Get Started' onPress={() => router.push("/register" as RelativePathString)} />
          <View style={styles.footer}>
            <Text style={styles.text}>Already have an account?{' '}</Text>
            <Link href="/login">
              <Text style={styles.link}>Login</Text>
            </Link>
          </View>
        </View >
        <View>

        </View>
      </View>
    </SafeAreaLayoutWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#f5f5f7",
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: "#1d1d1f",
  },
  link: {
    color: "#1d1d1f",
    textDecorationLine: 'underline',
    fontWeight: 900,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LandingScreen