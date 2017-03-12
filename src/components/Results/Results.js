import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import parkingData from '../../lib/parkingData';
import { sortByProximity } from '../../lib/parkingSorter';

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

  constructor(props) {
    super(props);
    this.state = { parkings: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const parkings = await sortByProximity(
      parkingData,
      this.props.navigation.state.params.from.lat,
      this.props.navigation.state.params.from.lon,
      this.props.navigation.state.params.to.lat,
      this.props.navigation.state.params.to.lon,
    );
    this.setState({ parkings });
  }

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
