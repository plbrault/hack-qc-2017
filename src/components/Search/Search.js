import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { styles, stylesFirstInput, stylesSecondInput } from './styles';

const query = {
  key: 'AIzaSyDbK4tmqXXSHQlL5DPayc7vQv8wzLFFK1E',
  language: 'fr',
};

class Search extends Component {
  static navigationOptions = {
    title: 'Recherche',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputAddress}>
          {/* FROM */}
          <Text style={styles.firstLabel}>Départ</Text>
          <GooglePlacesAutocomplete
            placeholder="Entrer l'adresse de départ"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            listViewDisplayed="true"    // true/false/undefined
            renderDescription={row => row.description} // custom description render
            onPress={(data) => {
              this.setState({ from: data });
            }}
            getDefaultValue={() => ''} // TODO: Change this with bookmarked data
            query={query}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={800}
            styles={stylesFirstInput}
          />

          {/* FROM */}
          <Text style={styles.secondLabel}>Destination</Text>
          <GooglePlacesAutocomplete
            placeholder="Entrer la destination"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            listViewDisplayed="true"    // true/false/undefined
            renderDescription={row => row.description} // custom description render
            onPress={(data) => {
              this.setState({ to: data });
            }}
            getDefaultValue={() => ''} // TODO: Change this with bookmarked data
            query={query}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={800}
            styles={stylesSecondInput}
          />
        </View>
      </View>
    );
  }
}

export default Search;
