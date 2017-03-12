import React, { Component, PropTypes } from 'react';
import {
  Picker,
  Text,
  TimePickerAndroid,
  View,
  Button,
} from 'react-native';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import settings from '../../settings.json';
import { styles, stylesFirstInput, stylesSecondInput } from './styles';

const query = {
  key: settings.autocompleteApiKey,
  language: 'fr',
};

function formatTime(hour, minute) {
  const min = minute < 10 ? `0${minute}` : minute;
  return `${hour}:${min}`;
}

class Search extends Component {
  static navigationOptions = {
    title: 'Recherche',
  };

  constructor(props) {
    super(props);

    this.showPicker = this.showPicker.bind(this);
    this.buttonIsDisabled = this.buttonIsDisabled.bind(this);

    this.state = {
      timeType: 'departure',
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      timeText: 'Maintenant',
      unixTime: moment().unix(),
    };
  }

  showPicker = async () => {
    try {
      const { action, minute, hour } = await TimePickerAndroid.open({
        hour: this.state.hour,
        minute: this.state.minute,
        is24Hour: true,
      });
      const newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState.timeText = formatTime(hour, minute);
        newState.hour = hour;
        newState.minute = minute;
        newState.unixTime = moment().hour(hour).minute(minute).unix();
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState.timeText = this.state.presetText;
      }
      this.setState(newState);
    } catch ({ code, message }) {
      throw new Error(`Error in example '${'preset'}': `, message);
    }
  };

  buttonIsDisabled() {
    return !!this.state.to && !!this.state.from;
  }

  render() {
    console.log(this.state); // eslint-disable-line
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.inputAddress}>
          {/* FROM */}
          <Text style={styles.firstLabel}>Départ</Text>
          <GooglePlacesAutocomplete
            placeholder="Entrer l'adresse de départ"
            minLength={2}
            autoFocus={false}
            fetchDetails={true} // eslint-disable-line
            listViewDisplayed="true"
            renderDescription={row => row.description}
            onPress={(data, details) => {
              const newFrom = {
                from: {
                  address: data.description,
                  lat: details.geometry.location.lat,
                  lon: details.geometry.location.lng,
                },
              };
              this.setState(newFrom);
            }}
            getDefaultValue={() => ''}
            query={query}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={800}
            styles={stylesFirstInput}
          />

          {/* TO */}
          <Text style={styles.secondLabel}>Destination</Text>
          <GooglePlacesAutocomplete
            placeholder="Entrer la destination"
            minLength={2}
            autoFocus={false}
            fetchDetails={true} // eslint-disable-line
            listViewDisplayed="true"
            renderDescription={row => row.description}
            onPress={(data, details) => {
              const newTo = {
                to: {
                  address: data.description,
                  lat: details.geometry.location.lat,
                  lon: details.geometry.location.lng,
                },
              };
              this.setState(newTo);
            }}
            getDefaultValue={() => ''}
            query={query}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={800}
            styles={stylesSecondInput}
          />
        </View>

        <Text style={styles.thirdLabel}>Heure</Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 175,
            left: 0,
            right: 0,
            margin: 15,
            paddingTop: 15,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Picker
              selectedValue={this.state.timeType}
              onValueChange={type => this.setState({ timeType: type })}
            >
              <Picker.Item label="Départ" value="departure" />
              <Picker.Item label="Arrivée" value="arrival" />
            </Picker>
          </View>
          <View style={{ flex: 1, paddingLeft: 15 }}>
            <Button
              onPress={this.showPicker}
              title={this.state.timeText}
              style={{}}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 230,
            left: 0,
            right: 0,
            margin: 15,
            paddingTop: 15,
            flex: 1,
          }}
        >
          { this.buttonIsDisabled() ?
            (
              <Button
                onPress={() => navigate('Results', {
                  to: this.state.to,
                  from: this.state.from,
                  unixTime: this.state.unixTime,
                  timeType: this.state.timeType,
                })}
                title="Rechercher"
              />
            ) : (
              <Button disabled title="Rechercher" onPress={() => null} />
            )
          }
        </View>
      </View>
    );
  }
}

Search.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Search;
