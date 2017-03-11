import React, { PropTypes } from 'react';
import {
  Button,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Home = (props) => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to HackQc17!
      </Text>

      <View>
        <Button
          onPress={() => navigate('Search')}
          title="Commencez l'aventure"
        />
      </View>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Home;
