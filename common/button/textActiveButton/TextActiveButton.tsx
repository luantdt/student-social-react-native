import { TouchableOpacity, Text, TextStyle, DimensionValue } from 'react-native';
import styles from './TextActiveButton.style';
import { fontStyle } from '@/assets/styles';
import { layoutConfig } from '@/config/layout';

type Props = {
  content: string;
  active: boolean;
  height: number | 'auto';
  width: DimensionValue;
  style: any;
  paddingHorizontal: number;
  paddingVertical: number;
  textAlign: "auto" | "left" | "center" | "right" | "justify";
  data: string | number | object;
  borderRadius: number;
  backgroundColorActive: string;
  backgroundColorInActive: string;
  activeColor: string;
  inactiveColor: string;
  disabled: boolean;
  handlePress: (name: string | number | object) => void;
  textStyle: TextStyle | undefined;
}

const defaultProps = {
  content: '',
  active: true,
  height: 'auto',
  width: '100%',
  style: '',
  paddingHorizontal: 10, 
  paddingVertical: 5,
  data: '',
  borderRadius: 30,
  handlePress: (name: string | number | object) => { },
  backgroundColorActive: layoutConfig.color._COLOR_BRAND_1,
  backgroundColorInActive: layoutConfig.color._COLOR_BRAND_WHITE,
  activeColor: layoutConfig.color._COLOR_BRAND_WHITE,
  inactiveColor: layoutConfig.color._COLOR_BRAND_1,
  textAlign: 'left',
  disabled: false,
  textStyle: undefined,
};


const TextActiveButton = ({
  content, active, height,
  style, paddingHorizontal, paddingVertical,
  handlePress, data, borderRadius,
  backgroundColorActive, backgroundColorInActive,
  activeColor, inactiveColor, textAlign,
  disabled, width, textStyle
}: Props) => {
  const addStyle = () => {
    return {
      borderColor: layoutConfig.color._COLOR_BRAND_4,
      backgroundColor: active ? backgroundColorActive : backgroundColorInActive,
      height: height,
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      width: width,
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        addStyle(),
        style ? style : {},
        { borderRadius: borderRadius, opacity: disabled ? 0.5 : 1 }
      ]}
      onPress={() => handlePress(data)}
      disabled={disabled}>
      <Text
        style={[
          textStyle ? textStyle : fontStyle.body04,
          {
            color: active ? activeColor : inactiveColor,
            textAlign: textAlign,
            width: '100%',
          }
        ]}
        numberOfLines={1}>
        {content}
      </Text>
    </TouchableOpacity>
  )
}

TextActiveButton.defaultProps = defaultProps;
export default TextActiveButton