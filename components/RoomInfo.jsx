import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';


export default class JoinParty extends Component {
  render() {
    const {
      navigation
    } = this.props
    const { roomInfo } = navigation.state.params
    const { partyCode, password } = roomInfo
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="ios-arrow-back" style={styles.headerIcon} onPress={() => navigation.goBack()} />
          <Text style={styles.headerMessage}>Room Info</Text>
        </View>
        <Text style={styles.h1}>
          Party code:
          {partyCode}
        </Text>
        <Text style={styles.h1}>
          Party pin:
          {password}
        </Text>
        <QRCode
          color="orange"
          backgroundColor="purple"
          size={300}
          value={JSON.stringify(roomInfo)}
        />
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
  h1: {
    fontSize: 40,
    color: 'white'
  }
});
