import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as firebase from 'firebase';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export default class CreateParty extends Component {
    state = {
        partyCode: 0,
        password : "",
        roomsRef : null,
        canProceed : false,
    }

    componentDidMount() {
        const roomsRef = firebase.database().ref(`rooms`)
        this.setState({roomsRef})
        roomsRef.once('value',snap => {
          const rooms = Object.keys(snap.val())
          //gen random 5 digit 
          let hostNumber = Math.floor(Math.random()*90000) + 10000;
          while(hostNumber in rooms){
            hostNumber = Math.floor(Math.random()*90000) + 10000;
          }
          this.setState({partyCode:hostNumber})

        })
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.h1}>Your party code is:</Text>
                <Text style={styles.h1}>{this.state.partyCode}</Text>
                <Text style={styles.h1}>Enter your password:</Text>
                <SmoothPinCodeInput
                    cellSize={36}
                    codeLength={4}
                    value={this.state.password}
                    onTextChange={this._handlePwChange}
                    />
                <TouchableOpacity 
                disabled={!this.state.canProceed}
                onPress={this._initRoom}>
                    <View style={this.state.canProceed ? styles.buttonContainer : {...styles.buttonContainer, backgroundColor: "#dddddd"} }>
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
    _setupRoom = () => {
        const {roomsRef , partyCode} = this.state
            roomsRef.child(partyCode).set({
                passwprd : this.state.password,
                startedAt: firebase.database.ServerValue.TIMESTAMP
            })       
         }

     _initRoom = () => {
         const {partyCode ,password} = this.state
        if(this.state.canProceed){
            this._setupRoom()
            this.props.navigation.navigate('Playing', {
                roomInfo: {
                    partyCode,
                    password
                },
            })
        }
        }

        _handlePwChange = (password) => {
            this.setState({password})
            password.length === 4 ? this.setState({canProceed:true}) : null
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