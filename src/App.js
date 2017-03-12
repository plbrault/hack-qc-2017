import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Results from './components/Results/Results';
import Search from './components/Search/Search';
import Navigation from './components/Navigation';

const App = StackNavigator({
  Search: { screen: Search },
  Navigation: { screen: Navigation },
  Results: { screen: Results },
});

AppRegistry.registerComponent('HackQc17', () => App);
