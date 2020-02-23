import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';
import Search from './components/Search';
import MusicPlayer from './components/MusicPlayer';
import CreateParty from './components/CreateParty';
import JoinParty from './components/JoinParty';
import Queue from './components/Queue';
import axios from 'axios';


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Search: Search,
    Playing: MusicPlayer,
    CreateParty: CreateParty,
    JoinParty: JoinParty,
    Queue: Queue,
  },
  {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  
  // state = {
  //   data:[]
  // }

  // componentDidMount(){
  //   this._pollData()
  // }
  // _pollData = () => {
  //   setInterval(this._getData, 1000)
  // }
  // _getData = () => {
  //   axios.get('http://5b25f14e.ngrok.io/appState')
  //   .then(res => {
  //     this.setState({
  //       data: res.data
  //     })
  //   })
  // }
  

  render() {
    // return <AppContainer data={this.state.data} />;
    return <AppContainer />
  }

}