import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';

// import MusicPlayer from 'MusicPlayer';
// import Search from 'Search';
const firebaseConfig = {
  apiKey: "AIzaSyBFz2zbD8HAv73hYQxpWcc0kElmJgb3g34",
  authDomain: "conuhacksradio.firebaseapp.com",
  databaseURL: "conuhacksradio.firebaseapp.io",
  storageBucket: "conuhacksradio.appspot.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class HomePage extends React.Component {
  state = {
    songs : [],
  }

  componentDidMount(){
    firebase.database().ref('modes').on('value', (snapshot) => {
      console.log(snapshot)
    })
  }
  render() {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Playing')}>
         <Text>Search Screen</Text>
         <Text>This was added after1</Text>
         <Text>'wawaa'</Text>
        </TouchableOpacity>
      </View>
    );
  }
}