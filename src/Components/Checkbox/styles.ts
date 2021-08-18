import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  border: {
    borderColor: 'blue',
    borderRadius: 5,
    borderWidth: 1,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  labelRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  labelStyle: {
    padding: 8,
    paddingLeft: 16,
  },
  labelWrapper: {
    flex: 1,
  },
  size: {
    height: 25,
    width: 25,
  },
});

export default styles;
