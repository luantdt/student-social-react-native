import { layoutConfig } from '@/config/layout';
import { StatusBar, ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export type EmptyLayoutProps = {
  children: React.ReactNode;
  style: object;
  entering: any;
  exiting: any;
  haveBottomNavigate: boolean;
}

const defaultProps = {
  style: {},
  exiting: null,
  entering: null,
  haveBottomNavigate: false,
}

const EmptyLayout = ({ children, style, exiting, entering, haveBottomNavigate }: EmptyLayoutProps) => {
  return (
    exiting === null && entering === null ?
      <ImageBackground
        source={require('@/assets/images/bg/gradient-bg.png')}
        style={{
          flex: 1,
          position: 'relative',
          ...style,
          paddingBottom: haveBottomNavigate ? layoutConfig._BOTTOM_NAVIGATE_HEIGHT : 0
        }}
        resizeMode='cover'>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent={true}
        />
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>{children}</SafeAreaView>
      </ImageBackground>
      :
      <ImageBackground
        source={require('@/assets/images/bg/gradient-bg.png')}
        style={{ flex: 1, position: 'relative', ...style }}
        resizeMode='cover'>
        <Animated.View exiting={exiting} entering={entering} style={{ flex: 1 }}>
          <StatusBar
            barStyle='light-content'
            backgroundColor="transparent"
            translucent={true}
          />
          <SafeAreaView style={{ flex: 1, position: 'relative' }}>{children}</SafeAreaView>
        </Animated.View>
      </ImageBackground>
  )
}

EmptyLayout.defaultProps = defaultProps;
export default EmptyLayout;