import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import moment from 'moment';
import parkingData from '../lib/parkingData';
import { sortByProximity } from '../lib/parkingSorter';

export default class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { parkings: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const parkings = await sortByProximity(parkingData, 45.421804, -71.963097, moment().unix());
    this.setState({ parkings });
  }

  render() {
    return (
      <ScrollView>
        { this.state.parkings.map(parking => <Text key={parking.name}>{JSON.stringify(parking)}</Text>) }
      </ScrollView>
    );
  }
}
