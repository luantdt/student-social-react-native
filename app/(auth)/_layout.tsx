import { layoutConfig } from '@/config/layout';
import { Stack } from 'expo-router';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import ReseNFT from '@/assets/images/nft/rese-nft.png';

export default function Layout() {
  return (
    <ImageBackground
      source={ReseNFT}
      style={styles.imageBg}
      imageStyle={{ marginTop: layoutConfig.header._HEADER_HEIGHT }}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
        }} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: layoutConfig.color._COLOR_BRAND_5,
  },
});