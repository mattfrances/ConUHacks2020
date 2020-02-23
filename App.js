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
import RoomInfo from './components/RoomInfo'
import Scanner from './components/Scanner'
import { Audio } from 'expo-av';
import * as firebase from 'firebase';
import {Platform, InteractionManager} from 'react-native';


/**
 * IGNORE THE FOLLOWING CODE AS IT REMEDIES THE ANDROID WARNINGS 
 * I believe Expo cannot deal with sockets and therefore defaults to long polling.
 * This kinda sucks, and Expo Android throws warnings. Not a clean fix but works
 * START
 */

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
//STOP


const firebaseConfig = {
  apiKey: "AIzaSyBFz2zbD8HAv73hYQxpWcc0kElmJgb3g34",
  authDomain: "conuhacksradio.firebaseapp.com",
  databaseURL: "https://conuhacksradio.firebaseio.com/",
  storageBucket: "conuhacksradio.appspot.com"
};

firebase.initializeApp(firebaseConfig)

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Search: Search,
    Playing: MusicPlayer,
    CreateParty: CreateParty,
    JoinParty: JoinParty,
    Queue: Queue,
    RoomInfo : RoomInfo,
    Scanner : Scanner,
  },
  {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
  },
);

const playbackInstance = new Audio.Sound()


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  
  render() {
    return <AppContainer screenProps={{playbackInstance}} />
  }

}