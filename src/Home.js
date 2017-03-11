import React, { Component, PropTypes } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import geoFence from './lib/geoFence';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class Home extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to HackQc17!
        </Text>
        <View>
          <Button
            onPress={() => {
              geoFence.notififyNearLatLon(45.423938, -71.963404, 500, (err, success) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('vous etes arriver');
                }
              });
            }}
            title="Commencez l'aventure"
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Home;
