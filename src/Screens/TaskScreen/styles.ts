import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingBottom: 2,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#e2e0df',
    borderRadius: 5,
    height: 40,
    paddingLeft: 8,
  },
  fieldContainer: {
    marginTop: 3 * 8,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 3 * 8,
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 3 * 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default styles;
