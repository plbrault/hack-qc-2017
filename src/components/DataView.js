import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import parkingData from '../lib/parkingData';
import { sortByProximity } from '../lib/parkingSorter';

const parkings = sortByProximity(parkingData, 45.421804, -71.963097);

export default class DataView extends React.Component {
  render() {
    return (
      <ScrollView>
        { parkings.map(parking => <Text key={parking.name}>{JSON.stringify(parking)}</Text>) }
      </ScrollView>
    );
  }
}
