import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c1de',
  },
  inputAddress: {
    margin: 30,
    padding: 30,
    backgroundColor: '#FFF',
    flex: 1,
  },
  firstLabel: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    fontWeight: 'bold',
  },
  secondLabel: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 80,
    fontWeight: 'bold',
  },
  thirdLabel: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 180,
    marginLeft: 15,
    fontWeight: 'bold',
  },
});

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
    color: '#000',
    fontSize: 20,
    backgroundColor: '#d2d2d2',
    borderRadius: 0,
  },
  listView: {
    backgroundColor: '#FFF',
  },
};

export const stylesFirstInput = StyleSheet.create({
  ...inputBase,
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 15,
    zIndex: 99,
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
