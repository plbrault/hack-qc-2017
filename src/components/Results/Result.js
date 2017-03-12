import React, { Component } from 'react';
import Moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    elevation: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  time: {
    fontSize: 18,
  },

  city: {
    fontSize: 18,
  },

  image: { width: 86, height: 39, marginRight: 20 },

  stats: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

class Result extends Component {
  constructor(props) {
    super(props);

    this.renderBus = this.renderBus.bind(this);
    this.renderMetro = this.renderMetro.bind(this);
  }

  renderBus() {
    if (this.props.hasTerminus) {
      return (
        <Image
          style={styles.image}
          source={require('../../../assets/bus.png')}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={require('../../../assets/bus_grey.png')}
      />
    );
  }

  renderMetro() {
    if (this.props.hasMetro) {
      return (
        <Image
          style={styles.image}
          source={require('../../../assets/metro.png')}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={require('../../../assets/metro_grey.png')}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => navigate('Navigation', {
          arriveBy: this.props.arriveBy,
          departAt: this.props.departAt,
          origin: this.props.origin,
          destination: this.props.destination,
          parking: {
            lat: this.props.lat,
            lon: this.props.lon,
          },
        })}
      >
        <View >
          <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, alignItems: 'center' }} >
            <Text style={styles.name}>
              {this.props.name}
            </Text>
            <Text style={styles.time}>
              {Moment('2017-01-01').startOf('day').seconds(this.props.totalDuration).format('H:mm')}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            {this.renderMetro()}
            {this.renderBus()}
          </View>


          <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 10,
                marginTop: 20,
              }}
            >
              <View style={{ alignItems: 'center' }} >
                <Text style={styles.label}>Stationnements</Text>
                <Text style={styles.stats}>{this.props.numPlaces.total}</Text>
              </View>
              <View style={{ alignItems: 'center' }} >
                <Text style={styles.label}>Places payantes</Text>
                <Text style={styles.stats}>{this.props.numPlaces.withFee}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 10,
                marginTop: 0,
              }}
            >
              <View style={{ alignItems: 'center' }} >
                <Text style={styles.label}>Co-voiturage</Text>
                <Text style={styles.stats}>{this.props.numPlaces.forCarpoolers}</Text>
              </View>
              <View style={{ alignItems: 'center' }} >
                <Text style={styles.label}>Borne électrique</Text>
                <Text style={styles.stats}>{this.props.numPlaces.withEVStation}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

Result.propTypes = {

};

export default Result;
