import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Search from './components/Search/Search';
import DataView from './components/DataView';

const App = StackNavigator({
  DataView: { screen: DataView },
  Home: { screen: Home },
  Search: { screen: Search },
});

AppRegistry.registerComponent('HackQc17', () => App);
