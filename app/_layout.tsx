import '../src/i18n';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Poppins_300Light, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { initializeLanguage } from '../src/i18n/language';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [languageReady, setLanguageReady] = useState(false);

  useEffect(() => {
    void initializeLanguage().finally(() => setLanguageReady(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded && languageReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, languageReady]);

  if (!fontsLoaded || !languageReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" options={{ animation: 'fade' }} />
    </Stack>
  );
}
