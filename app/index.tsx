import { useAuthStore } from '@/store/authStore';
import { auth } from '@/utils/firebase';
import { Redirect } from 'expo-router';
import { signOut } from 'firebase/auth';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export default function Home() {
  const { isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return <Redirect href={"/(tab)/newfeed"} />;
}