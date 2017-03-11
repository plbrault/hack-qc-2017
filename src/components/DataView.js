import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import parkingData from '../lib/parkingData';

export default class DataView extends React.Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(parkingData)}</Text>
      </View>
    );
  }
}
