import React, { Component, PropTypes } from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';

import navigationHTML from '../lib/navigationHTML';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  render() {
    const coordinates = {
      origin: {
        lat: 45.2654426,
        lng: -72.1515366,
      },
      parking: {
        lat: 45.4109597,
        lng: -71.9052587,
      },
      destination: {
        lat: 45.4101637,
        lng: -71.8880686,
      },
    };

    const html = navigationHTML
            .replace(/__CENTER_LAT__/, 45.3618497)
            .replace(/__CENTER_LNG__/, -72.0517597)
            .replace(/__PARKING_LAT__/, coordinates.parking.lat)
            .replace(/__PARKING_LNG__/, coordinates.parking.lng)
            .replace(/__ORIGIN_LAT__/, coordinates.origin.lat)
            .replace(/__ORIGIN_LNG__/, coordinates.origin.lng)
            .replace(/__DESTINATION_LAT__/, coordinates.destination.lat)
            .replace(/__DESTINATION_LNG__/, coordinates.destination.lng);

    return (
      <View style={styles.map}>
        <WebView
          scrollEnabled={false}
          source={{ html }}
          styles={styles.container}
        />
        <View style={styles.list}>
          <Text style={styles.text}>{'Instructions'}</Text>
        </View>
        <Button
          title={'Commencer'}
          onPress={() => {
            Linking.openURL(`google.navigation:q=${coordinates.parking.lat},${coordinates.parking.lng}`);
          }}
        />
      </View>
    );
  }
}

Navigation.propTypes = {
  navigation: PropTypes.shape().isRequired,
  // origin: PropTypes.shape().isRequired,
  // destination: PropTypes.shape().isRequired,
  // parking: PropTypes.shape().isRequired,
};

export default Navigation;
