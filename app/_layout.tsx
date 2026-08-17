import { Stack } from "expo-router";
import * as NavigationBar from 'expo-navigation-bar';
import { PaperProvider, useTheme } from 'react-native-paper';

NavigationBar.setButtonStyleAsync('dark');

export default function RootLayout() {
  const theme = useTheme();
  theme.colors.primary = 'yellow';
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} /> */}
      </Stack>
    </PaperProvider>
  )
}
