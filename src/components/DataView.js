import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import parkingData from '../lib/parkingData';

export default class DataView extends React.Component {
  render() {
    return (
      <ScrollView>
        { parkingData.map(parking => <Text key={parking.name}>{JSON.stringify(parking)}</Text>) }
      </ScrollView>
    );
  }
}
