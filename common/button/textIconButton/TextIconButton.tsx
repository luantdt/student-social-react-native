import { TouchableOpacity, Image, Text, ActivityIndicator, TextStyle } from 'react-native';
import styles from './TextIconButton.style';
import { memo } from 'react';
import { layoutConfig } from '@/config/layout';

type Props = {
  image: HTMLImageElement | undefined;
  content: string;
  style: object;
  disabled: boolean;
  width: number | '100%' | null | '40%' | '50%' | '45%' | 'auto';
  height: number | null;
  pHor: number; 
  pVer: number; 
  textStyle: TextStyle;
  isLoading: boolean;
  fontSize: number;
  bgColor: string;
  textColor: string;
  onPress: () => void;
};


const defaultProps = {
  style: {},
  content: '',
  image: undefined,
  disabled: false,
  width: '100%',
  height: undefined,
  pHor: 24,
  pVer: 14,
  textStyle: null,
  isLoading: false,
  fontSize: 16,
  bgColor: '#8A0BFF',
  textColor: layoutConfig.color._COLOR_BRAND_WHITE,
  onPress: () => { },
};


const TextIconButton = ({
  image, content, style,
  disabled, width, height,
  pHor, pVer, textStyle,
  onPress, isLoading, fontSize,
  bgColor, textColor
}: Partial<Props>) => {
  const renderIcon = () => {
    if (image) {
      return <Image source={image} style={styles.icon} />
    };
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style ? style : {},
        {
          opacity: disabled ? 0.5 : 1,
          width: width || defaultProps.width,
          height: height || defaultProps.height,
          paddingHorizontal: pHor || defaultProps.pHor,
          paddingVertical: pVer || defaultProps.pVer,
          backgroundColor: bgColor || defaultProps.bgColor,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >

      {renderIcon()}
      <Text style={[
        textStyle ? textStyle : styles.text,
        {
          fontSize: fontSize || defaultProps.fontSize,
          color: textColor || defaultProps.textColor,
        }
      ]}>
        {isLoading ? <ActivityIndicator size="small" color={"#fff"} /> : content}
      </Text>
    </TouchableOpacity>
  )
}

export default memo(TextIconButton);