import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Result from './Result';
import headerStyle from '../headerStyle';

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
      dataSource: ds.cloneWithRows([
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
      ]),
    };
  }

  render() {
    const { params } = this.props.navigation.state;
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
              {params.to.address.toUpperCase()}
            </Text>
          </View>
          <View style={styles.to}>
            <Text style={styles.whiteLabel}>
              ARRIVÉE
            </Text>
            <Text style={styles.yellowLabel}>
              {params.from.address.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.listViewContainer}>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Result {...rowData} />
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
