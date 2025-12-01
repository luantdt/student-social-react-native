import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 30,
  },
  icon: {
    position: 'absolute',
    left: 32,
  },
  text: {
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.6,
  }
});

export default styles;