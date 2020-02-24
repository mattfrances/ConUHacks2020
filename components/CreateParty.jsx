import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import * as firebase from 'firebase';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export default class CreateParty extends Component {
    state = {
      partyCode: 0,
      password: '',
      roomsRef: null,
      canProceed: false,
    }

    componentDidMount() {
      const roomsRef = firebase.database().ref('rooms')
      this.setState({ roomsRef })
      roomsRef.once('value', (snap) => {
        const rooms = snap.val() ? Object.keys(snap.val()) : []
        // gen random 5 digit
        let hostNumber = Math.floor(Math.random() * 90000) + 10000;
        while (hostNumber in rooms) {
          hostNumber = Math.floor(Math.random() * 90000) + 10000;
        }
        this.setState({ partyCode: hostNumber.toString() })
      })
    }


    _setupRoom = () => {
      const { password } = this.state
      const { roomsRef, partyCode } = this.state
      roomsRef.child(partyCode).set({
        password,
        startedAt: firebase.database.ServerValue.TIMESTAMP,
        songs: [{ placeholder: 'if this is empty, it will not set a val you need to account for this' }],
      })
    }

     _initRoom = () => {
       const { partyCode, password, canProceed } = this.state
       const { navigation } = this.state
       if (canProceed) {
         this._setupRoom()
         navigation.navigate('Playing', {
           roomInfo: {
             partyCode,
             password
           },
         })
       }
     }

        _handlePwChange = (password) => {
          this.setState({ password })
          if (password.length === 4) {
            this.setState({ canProceed: true })
          }
        }

        render() {
          const { partyCode, password, canProceed } = this.state
          return (
            <SafeAreaView style={styles.container}>
              <Text style={styles.h1}>Your party code is:</Text>
              <Text style={styles.h1}>{partyCode}</Text>
              <Text style={styles.h1}>Enter your password:</Text>
              <SmoothPinCodeInput
                cellSize={36}
                codeLength={4}
                value={password}
                onTextChange={this._handlePwChange}
              />
              <TouchableOpacity
                disabled={!canProceed}
                onPress={this._initRoom}
              >
                <View style={canProceed ? styles.buttonContainer : { ...styles.buttonContainer, backgroundColor: '#dddddd' }}>
                  <Text
                    style={styles.button}
                          // onPress={() => this.onPress()}
                    color="#fff"
                  >
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>

            </SafeAreaView>
          );
        }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
  h1: {
    color: 'white',
    fontSize: 30,
  },
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    paddingBottom: 30,
    margin: 50,
  },
  button: {
    fontSize: 20,
    color: 'white',
  }
});
