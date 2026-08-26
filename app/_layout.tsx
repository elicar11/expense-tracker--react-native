import { RelativePathString, Stack, useRouter, useSegments } from "expo-router";
import * as NavigationBar from 'expo-navigation-bar';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react"; // Ajout de useState
import { supabaseConfig } from "@/utils/supabase";
import { getCurrentUserSession } from "@/services/users";

NavigationBar.setButtonStyleAsync('dark');

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, setUser, checkingUserSession, setCheckingSession } = useAuthStore();
  
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    const { data: authListener } = supabaseConfig.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const profile = await getCurrentUserSession();
          setUser(profile ?? null);
        } else {
          setUser(null);
        }
        setCheckingSession(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setCheckingSession]);

  useEffect(() => {
    if (!isLayoutReady || checkingUserSession) return;

    const inAuthGroup = segments[0] === "user";

    if (user && !inAuthGroup) {
      router.replace("/user/home" as RelativePathString);
    } else if (!user && inAuthGroup) {
      router.replace("/landing" as RelativePathString);
    }
  }, [user, checkingUserSession, segments, isLayoutReady, router]); 
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </PaperProvider>
  );
}