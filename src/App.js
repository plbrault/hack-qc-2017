import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Results from './components/Results/Results';
import DataView from './components/DataView';
import Search from './components/Search/Search';
import Navigation from './components/Navigation';

const App = StackNavigator({
  Home: { screen: Home },
  Navigation: { screen: Navigation },
  DataView: { screen: DataView },
  Search: { screen: Search },
  Results: { screen: Results },
});

AppRegistry.registerComponent('HackQc17', () => App);
