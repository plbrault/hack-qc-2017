import { StyleSheet } from 'react-native';

const inputBase = {
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 60,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 50,
    color: '#5d5d5d',
    fontSize: 20,
    backgroundColor: '#eee',
  },
  predefinedPlacesDescription: {
    marginTop: -10,
    padding: 0,
  },
  listView: {
    backgroundColor: '#FFF',
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inputAddress: {
    margin: 15,
  },
  firstLabel: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    fontWeight: 'bold',
  },
  firstInput: {

  },
  secondLabel: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 80,
    fontWeight: 'bold',
  },
  secondInput: {

  },
});

export const stylesFirstInput = StyleSheet.create({
  ...inputBase,
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 15,
    zIndex: 2,
  },
});
export const stylesSecondInput = StyleSheet.create({
  ...inputBase,
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 95,
    zIndex: 1,
  },
});
