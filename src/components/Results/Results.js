import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
class Results extends Component {
  static navigationOptions = {
    title: 'Résultats',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
      </View>
    );
  }
}

Results.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Results;
