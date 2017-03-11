import React from 'react';
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

const Home = () => {
  const { navigate } = this.props.navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to HackQc17!
      </Text>

      <View>
        <Button
          onClick={() => navigate('Search')}
          title="Commencez l'aventure"
        />
      </View>
    </View>
  );
};

export default Home;
