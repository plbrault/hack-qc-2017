import React, { Component, PropTypes } from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  View,
  WebView,
} from 'react-native';

import navigationHTML from './../lib/navigationHTML';
import geoFenceNotifier from './../lib/geoFenceNotifier';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  button: {
    height: 100,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: 'driving',
    };

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation() {
    const { parking } = this.props.navigation.state.params;

    if (this.state.navigation === 'driving') {
      this.setState({ navigation: 'transit' });
      geoFenceNotifier.noticeMeWhenNear(parking.lat, parking.lon, 300, 'Vous êtes arrivés au stationnement', 'Continuez votre trajet avec nous');
      Linking.openURL(`google.navigation:q=${parking.lat},${parking.lon}`);
    } else {
      Linking.openURL(`http://maps.google.com/maps?daddr=${parking.lat},${parking.lon}&dirflg=r`);
    }
  }

  render() {
    const {
      parking,
      origin,
      destination,
      arriveBy,
      departAt,
    } = this.props.navigation.state.params;
    const html = navigationHTML
            .replace(/__CENTER_LAT__/, 45.3618497)
            .replace(/__CENTER_LNG__/, -72.0517597)
            .replace(/__PARKING_LAT__/, parking.lat)
            .replace(/__PARKING_LNG__/, parking.lon)
            .replace(/__ORIGIN_LAT__/, origin.lat)
            .replace(/__ORIGIN_LNG__/, origin.lon)
            .replace(/__DESTINATION_LAT__/, destination.lat)
            .replace(/__DESTINATION_LNG__/, destination.lon)
            .replace(/__ARRIVE_BY__/, arriveBy || '')
            .replace(/__DEPART_AT__/, departAt || '');

    return (
      <View style={styles.map}>
        <WebView
          source={{ html }}
        />
        <View style={styles.button}>
          <Button
            title={this.state.navigation === 'driving' ? 'Navigation' : 'Navigation'}
            onPress={this.handleNavigation}
          />
        </View>
      </View>
    );
  }
}

Navigation.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Navigation;
