import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Result from './Result';
import headerStyle from '../headerStyle';
import parkingData from '../../lib/parkingData';
import { sortByProximity } from '../../lib/parkingSorter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2d2d2',
  },

  header: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    backgroundColor: '#002d73',
    justifyContent: 'space-around',
  },

  whiteLabel: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
  },

  yellowLabel: {
    color: '#cfde00',
    fontSize: 14,
  },

  listViewContainer: {
    flex: 3,
  },

  qtyResultLabel: {
    color: '#000',
    paddingBottom: 10,
  },
});

class Results extends Component {
  static navigationOptions = {
    title: 'Choix de l\'itinéraire',
    header: headerStyle,
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      /*dataSource: ds.cloneWithRows([
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: true,
          hasMetro: true,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: false,
          hasMetro: true,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: true,
          hasMetro: false,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: false,
          hasMetro: true,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: true,
          hasMetro: true,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
        {
          name: 'Brossard-Chevrier',
          city: 'Montréal',
          hasTerminus: false,
          hasMetro: false,
          numPlaces: {
            total: 3000,
            withFee: 2389,
            forCarpoolers: 20,
            withEVStation: 10,
          },
        },
      ]),*/
      dataSource: ds,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const parkings = await sortByProximity(
      parkingData,
      this.props.navigation.state.params.from,
      this.props.navigation.state.params.to,
    );
    const ds = this.state.dataSource;
    this.setState({ dataSource: ds.cloneWithRows(parkings) });
  }

  render() {
    const { params } = this.props.navigation.state;
    const itinerary = {
      origin: params.from,
      destination: params.to,
      navigation: {
        navigate: this.props.navigation.navigate,
      },
    };

    if (params.timeType === 'arrival') {
      itinerary.arriveBy = params.datetime;
    } else {
      itinerary.departAt = params.datetime;
    }

    // const params = {
    //   to: { address: '118 rue Milette, Magog, Québec' },
    //   from: { address: '118 rue Milette, Magog, Québec' },
    // };
    return (
      <View style={styles.container}>
        <View
          style={styles.header}
        >
          <View style={styles.from}>
            <Text style={styles.whiteLabel}>
              DÉPART
            </Text>
            <Text style={styles.yellowLabel}>
              {params.from.address.toUpperCase()}
            </Text>
          </View>
          <View style={styles.to}>
            <Text style={styles.whiteLabel}>
              ARRIVÉE
            </Text>
            <Text style={styles.yellowLabel}>
              {params.to.address.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.listViewContainer}>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Result {...rowData} {...itinerary} />
            )}
          />
        </View>
      </View>
    );
  }
}

Results.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Results;
