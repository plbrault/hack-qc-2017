import React, { Component, PropTypes } from 'react';
import {
  Picker,
  Text,
  TimePickerAndroid,
  View,
  Button,
  TouchableNativeFeedback,
  TextInput,
  Image,
} from 'react-native';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import settings from '../../settings.json';
import { styles, stylesFirstInput, stylesSecondInput } from './styles';
import headerStyle from '../headerStyle';

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
    header: headerStyle,
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
      datetime: moment().format(),
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
        newState.datetime = moment().hour(hour).minute(minute).format();
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
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#00c1de',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            padding: 20,
            // flex: 1,
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            ENTRER VOTRE TRAJET
          </Text>
        </View>

        <View
          style={{
            // flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: '#FFF',
              margin: 20,
              marginTop: 0,
              padding: 20,
            }}
          >

            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingBottom: 10,
                }}
              >
                DÉPART
              </Text>
              <TextInput
                onChangeText={(text) => {
                  this.setState({ from: text });
                }}
                style={{
                  paddingRight: 10,
                  fontSize: 18,
                }}
              />

            </View>

            <View
              style={{

              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingBottom: 10,
                }}
              >
                ARRIVÉE
              </Text>
              <TextInput
                style={{
                  paddingRight: 10,
                  fontSize: 18,
                }}
                onChangeText={(text) => {
                  this.setState({ to: text });
                }}
              />
            </View>

          </View>
        </View>

        <View
          style={{
            padding: 20,
            paddingTop: 0,
          }}
        >
          { this.buttonIsDisabled() ?
            (
              <TouchableNativeFeedback
                onPress={() => navigate('Results', {
                  to: this.state.to,
                  from: this.state.from,
                  unixTime: this.state.unixTime,
                  timeType: this.state.timeType,
                  datetime: this.state.datetime,
                })}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View
                  style={{
                    backgroundColor: '#cfde00',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#002d73',
                      padding: 15,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                      RECHERCHER
                    </Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <View
                style={{
                  backgroundColor: '#cfde00',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'grey',
                    padding: 15,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                    RECHERCHER
                  </Text>
              </View>
            )
          }

        </View>

        <View
          style={{
            // flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Image
            source={require('../../../assets/image_recherche.png')}
          />
        </View>

      </View>
    );
  }
}

Search.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Search;
