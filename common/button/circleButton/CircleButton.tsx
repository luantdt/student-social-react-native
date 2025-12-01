import { TouchableOpacity, Image, ViewStyle, ImageSourcePropType } from 'react-native';
import styles from './CircleButton.style';

type Props = {
  icon: ImageSourcePropType | undefined;
  style: ViewStyle;
  bgColor: string;
  width: number;
  thumbIcon: React.ReactNode;
  iconWidth: number;
  handleOnPress: () => void;
  disabled: boolean;
}

const defaultProps = {
  icon: undefined,
  style: {},
  bgColor: '#E7DDFF',
  width: 50,
  thumbIcon: <></>,
  iconWidth: 30,
  handleOnPress: () => { },
  disabled: false,
}

const CircleButton = ({
  icon, style, bgColor,
  width, thumbIcon, iconWidth,
  handleOnPress, disabled
}: Props & typeof defaultProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style ? style : {},
        {
          width: width,
          height: width,
          borderRadius: (width + (icon ? 40 : 0)) / 2,
          backgroundColor: bgColor,
        }
      ]}
      onPress={handleOnPress}
      disabled={disabled}>
      {icon ? <Image source={icon} style={{ width: iconWidth, height: iconWidth }} /> : ''}
      {thumbIcon}
    </TouchableOpacity>
  )
}

CircleButton.defaultProps = defaultProps;
export default CircleButton;