import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import Search from './Search';

const App = StackNavigator({
  Home: { screen: Home },
  Search: { screen: Search },
});

AppRegistry.registerComponent('HackQc17', () => App);


