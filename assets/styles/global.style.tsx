import { StyleSheet } from 'react-native';

const GlobalStyle = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alCen: {
    alignItems: 'center',
  },
  jusCen: {
    justifyContent: 'center',
  },
  cenCen: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  posRelative: {
    position: 'relative',
  },
  posAbs: {
    position: 'absolute',
  },

  parentBasic: {
    flex: 1,
    position: 'relative',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mb40: {
    marginBottom: 40,
  },
  mr5: {
    marginRight: 5,
  },
  ml5: {
    marginLeft: 5,
  },

  dn: {
    display: 'none',
  },

  cwhite: {
    color: '#fff',
  },

  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },

})

export default GlobalStyle;