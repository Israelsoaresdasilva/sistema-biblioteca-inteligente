import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  const [verificado, setVerificado] = useState(false);

  useEffect(() => {
    verificarOnboarding();
  }, []);

  const verificarOnboarding = async () => {
    const concluido = await AsyncStorage.getItem('onboarding_concluido');
    if (!concluido) {
      router.replace('/onboarding');
    }
    setVerificado(true);
  };

  return (
    <>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="livro/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
