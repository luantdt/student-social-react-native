import '../global.css';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Stack } from 'expo-router';
import { useAuthService } from '@/hooks/useAuthService';

export default function Layout() {
  useAuthService();
  
  return <KeyboardProvider>
    <Stack screenOptions={{ headerShown: false, statusBarStyle: "inverted", statusBarTranslucent: true }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tab)" />
    </Stack>
  </KeyboardProvider>
}
