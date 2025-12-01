import { NativeTabs, Label } from 'expo-router/unstable-native-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="newfeed">
        <Entypo name="home" size={24} color="black" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <FontAwesome name="user-circle-o" size={24} color="black" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
