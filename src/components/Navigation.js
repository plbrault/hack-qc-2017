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

class Navigation extends Component {
  render() {
    const { parking, origin, destination, arriveBy, departAt } = this.props;
    const html = navigationHTML
            .replace(/__CENTER_LAT__/, 45.3618497)
            .replace(/__CENTER_LNG__/, -72.0517597)
            .replace(/__PARKING_LAT__/, parking.lat)
            .replace(/__PARKING_LNG__/, parking.lng)
            .replace(/__ORIGIN_LAT__/, origin.lat)
            .replace(/__ORIGIN_LNG__/, origin.lng)
            .replace(/__DESTINATION_LAT__/, destination.lat)
            .replace(/__DESTINATION_LNG__/, destination.lng)
            .replace(/__ARRIVE_BY__/, arriveBy)
            .replace(/__DEPART_AT__/, departAt);

    return (
      <View style={styles.map}>
        <WebView
          source={{ html }}
          style={styles.map}
        />
        <Button
          title={'Navigation'}
          onPress={() => {
            Linking.openURL(`google.navigation:q=${parking.lat},${parking.lng}`);
          }}
        />
      </View>
    );
  }
}

Navigation.defaultProps = {
  arriveBy: '',
  departAt: '',
};

Navigation.propTypes = {
  arriveBy: PropTypes.string,
  departAt: PropTypes.string,
  destination: PropTypes.shape().isRequired,
  origin: PropTypes.shape().isRequired,
  parking: PropTypes.shape().isRequired,
};

export default Navigation;
