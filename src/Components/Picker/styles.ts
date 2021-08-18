import {Platform, StyleSheet} from 'react-native';

export const getShadow = (height?: number) =>
  Platform.select({
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: height || 0,
      },
      shadowOpacity: 0.13,
      shadowRadius: 6,
    },
  });

export default StyleSheet.create({
  bordered: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  container: {
    marginBottom: 2 * 8,
  },
  item: {
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    width: '90%',
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 10,
  },
  modal: {
    height: '100%',
    width: '100%',
  },
  optionsContainer: {
    backgroundColor: '#e2e0df',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 8,
    position: 'absolute',
  },
  optionsSubcontainer: {
    paddingTop: 7,
  },
  picker: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    backgroundColor: '#e2e0df',
    height: 40,
    borderRadius: 5,
  },
  pickerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 3 * 8,
  },
  pickerText: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 12,
    paddingVertical: 8,
  },
});
