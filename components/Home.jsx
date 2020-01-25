import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import MusicPlayer from 'MusicPlayer';
// import Search from 'Search';

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Playing')}>
         <Text>Search Screen</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}