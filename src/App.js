import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import Search from './Search';
import Navigation from './Navigation';

const App = StackNavigator({
  Home: { screen: Home },
  Search: { screen: Search },
  Navigation: { screen: Navigation },
});

AppRegistry.registerComponent('HackQc17', () => App);
