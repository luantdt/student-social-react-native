import { StyleSheet } from 'react-native';
import { fontStyle } from '@/assets/styles';
import { layoutConfig } from '@/config/layout';

const styles = StyleSheet.create({
  inputArea: {
    width: '100%',
    backgroundColor: layoutConfig.color._COLOR_FIELD_BACKGROUND,
    borderRadius: 30,
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    color: layoutConfig.color._COLOR_BRAND_6,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  icon: {
    position: 'absolute',
    right: 20,
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
  },
  errorText: {
    color: layoutConfig.color._COLOR_ERROR,
    ...fontStyle.title04,
  },
  copyBox: {
    padding: 10,
    borderRadius: 25,
    position: 'relative',
  },
  copy: {
    position: 'absolute',
    top: 13,
    right: 13,
    backgroundColor: layoutConfig.color._COLOR_FIELD_BACKGROUND,
    zIndex: 10,
    borderRadius: 25,
  },
  lottie: {
    width: '100%',
    height: '100%',
  }
});

export default styles;
