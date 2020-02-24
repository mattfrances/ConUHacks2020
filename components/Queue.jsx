import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VoteUpNext from './VoteUpNext';




const myData = [
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
  {
    title: 'Song',
    artist: 'Artist'
  },
];

export default class Queue extends Component {
    state = {
      // eslint-disable-next-line react/no-unused-state
      data: myData,
    }

    render() {
      const { navigation } = this.props
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Ionicons name="ios-arrow-back" style={styles.headerIcon} onPress={() => navigation.goBack()} />
            <Text style={styles.headerMessage}>Queue</Text>
          </View>
          <VoteUpNext title="HUMBLE" artist="Kendrick Lamaar" />
          <VoteUpNext title="Hotline Bling" artist="Drake" />
          <VoteUpNext title="Snow" artist="Red Hot Chilli Peppers" />
          <VoteUpNext title="Thriller" artist="Michael Jackson" />
          <VoteUpNext title="Piano Man" artist="Billie Joel" />
          <VoteUpNext title="Life is Good" artist="Future" />
          <VoteUpNext title="Panda" artist="Desiigner" />
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    // eslint-disable-next-line no-undef
    paddingTop: Expo.Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  headerContainer: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    // flex: 0.1,
  },
  headerMessage: {
    // flex: 1,
    // textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 20,
    // borderColor: 'red',
    // borderWidth: 5,
    position: 'relative',
    top: 0,
    left: 130,
  },
  headerIcon: {
    fontSize: 32,
    color: '#444',
  },
});
