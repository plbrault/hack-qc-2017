import React, { Component, PropTypes } from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  View,
  WebView,
} from 'react-native';

import navigationHTML from './../lib/navigationHTML';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const props = {
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

class Navigation extends Component {
  render() {
    const html = navigationHTML
            .replace(/__CENTER_LAT__/, 45.3618497)
            .replace(/__CENTER_LNG__/, -72.0517597)
            .replace(/__PARKING_LAT__/, props.parking.lat)
            .replace(/__PARKING_LNG__/, props.parking.lng)
            .replace(/__ORIGIN_LAT__/, props.origin.lat)
            .replace(/__ORIGIN_LNG__/, props.origin.lng)
            .replace(/__DESTINATION_LAT__/, props.destination.lat)
            .replace(/__DESTINATION_LNG__/, props.destination.lng);
            // .replace(/__OPTIONS__/, {});

    const test = '<p>Hello world!</p>';
    return (
      <View style={styles.map}>
        <WebView
          source={{ html: html }}
          style={styles.map}
        />
        <Button
          title={'Commencer'}
          onPress={() => {
            Linking.openURL(`google.navigation:q=${props.parking.lat},${props.parking.lng}`);
          }}
        />
      </View>
    );
  }
}

Navigation.propTypes = {
  // origin: PropTypes.shape().isRequired,
  // destination: PropTypes.shape().isRequired,
  // parking: PropTypes.shape().isRequired,
};

export default Navigation;
