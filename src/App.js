import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Search from './components/Search/Search';

const App = StackNavigator({
  Search: { screen: Search },
  Home: { screen: Home },
});

AppRegistry.registerComponent('HackQc17', () => App);
