import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import DataView from './components/DataView';
import Search from './Search';

const App = StackNavigator({
  Home: { screen: Home },
  DataView: { screen: DataView },
  Search: { screen: Search },
});

AppRegistry.registerComponent('HackQc17', () => App);
