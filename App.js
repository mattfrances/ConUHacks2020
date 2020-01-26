import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';
import Search from './components/Search';
import MusicPlayer from './components/MusicPlayer';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Search: Search,
    Playing: MusicPlayer,
  },
  {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}