import { memo, useRef, useState } from 'react';
import { TextInput, View, Pressable, Image, Text, ToastAndroid } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './RadiusInput.style';
import { fontStyle, globalStyle } from '@/assets/styles';
import GlobalStyle from '@/assets/styles/global.style';
import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';
import StickAnimation from '@/assets/animation/stick.json';
import IconOcticons from '@expo/vector-icons/Octicons';
import { layoutConfig } from '@/config/layout';
import Layout from '@/app/_layout';

type Props = {
  isPassword: boolean;
  placeHolder: string;
  style: Object;
  iconLeft: HTMLImageElement | '';
  placeHolderColor: string;
  value: string;
  errorText: string;
  title: string;
  isCenter: boolean;
  editable: boolean;
  copy: boolean;
  type: 'button' | 'text';
  iconLeftElement: React.ReactNode | undefined;
  enableIconDelete: boolean;
  keyType: 'done' | 'go' | 'next' | 'search' | 'send';
  onBlur: (e: any) => void;
  onFocus: (e: any) => void;
  handleTextChange: (text: string) => void;
  onPress: () => void;
  onSubmitEditing: () => void;
}

const defaultProps = {
  isPassword: false,
  placeHolder: '',
  style: {},
  iconLeft: '',
  placeHolderColor: '',
  value: '',
  errorText: '',
  title: '',
  isCenter: false,
  editable: true,
  copy: false,
  type: 'text',
  iconLeftElement: undefined,
  enableIconDelete: false,
  keyType: "done",
  onBlur: () => { },
  onFocus: () => { },
  handleTextChange: (text: string) => { },
  onPress: () => { },
  onSubmitEditing: () => { },
};

const RadiusInput = ({
  isPassword, placeHolder, style,
  iconLeft, placeHolderColor, value,
  errorText, title, copy,
  isCenter, editable, type,
  iconLeftElement, enableIconDelete,
  keyType,
  onBlur, onFocus, handleTextChange,
  onPress, onSubmitEditing,
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeCopyBtn, setActiveCopyBtn] = useState<boolean>(false);
  const stickAnimationLottie = useRef<LottieView>(null);

  const renderRightIcon = () => {
    if (isPassword) {
      return <Pressable
        style={styles.icon}
        onPress={() => { setShowPassword(!showPassword) }}>
        <Feather
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="black" />
      </Pressable>
    }

    if (copy) {
      return (
        <Pressable
          style={styles.icon}
          onPress={onPressCopy}
          disabled={activeCopyBtn}>
          <View style={styles.copyBox}>
            <LottieView
              source={StickAnimation}
              loop={false}
              autoPlay={false}
              style={styles.lottie}
              resizeMode='cover'
              ref={stickAnimationLottie} />
            {
              !activeCopyBtn ? <Feather
                name={'copy'}
                size={26}
                color={layoutConfig.color._COLOR_BRAND_4}
                style={styles.copy} /> : ""
            }

          </View>
        </Pressable>
      )
    }

    if (enableIconDelete && type === 'text' && value !== '') {
      return (
        <Pressable
          style={styles.icon}
          onPress={() => handleTextChange("")}>
          <IconOcticons
            name={'x-circle-fill'}
            size={20}
            color={layoutConfig.color._COLOR_BRAND_4} />
        </Pressable>
      )
    }
  }

  const isSecure = () => {
    if (!isPassword) {
      return false;
    }
    if (!showPassword) {
      return true;
    }
    return false;
  }

  const renderIconLeft = () => {
    if (iconLeft !== '') {
      return <Image source={iconLeft} style={styles.iconLeft} />
    }

    if (iconLeftElement !== '') return <View style={styles.iconLeft}>{iconLeftElement}</View>;
  }

  const renderErrorText = () => {
    if (errorText) {
      return <Text style={[styles.errorText, GlobalStyle.cenCen]}>{errorText}</Text>
    }
  }

  const renderTitle = () => {
    if (title) {
      return <Text style={[fontStyle.body04, GlobalStyle.cwhite, GlobalStyle.cenCen]}>Invitation code (optional):</Text>
    }
  }

  const onPressCopy = async () => {
    await Clipboard.setStringAsync(value);
    ToastAndroid.show('Copy successfully', ToastAndroid.SHORT);
    if (stickAnimationLottie.current) {
      stickAnimationLottie.current.play(0);
    }
    setActiveCopyBtn(true);
    setTimeout(() => {
      setActiveCopyBtn(false);
    }, 3000);

  }

  return (
    <View style={[globalStyle.w100, style]}>
      {renderTitle()}
      <View style={styles.inputArea}>
        {renderIconLeft()}
        <TextInput
          style={[
            styles.input,
            isPassword || copy || enableIconDelete ? { paddingRight: 50 } : {},
            iconLeft !== '' || iconLeftElement !== undefined ? { paddingLeft: 50 } : {},
            {
              textAlign: isCenter ? 'center' : 'left',
            }
          ]}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor !== '' ? placeHolderColor : layoutConfig.color._COLOR_BRAND_6}
          secureTextEntry={isSecure()}
          value={value}
          onChangeText={handleTextChange}
          editable={editable && type === 'text'}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={keyType}
          onSubmitEditing={onSubmitEditing} />
        {renderRightIcon()}
      </View>
      {renderErrorText()}
    </View>
  )
}

RadiusInput.defaultProps = defaultProps;
export default memo(RadiusInput)