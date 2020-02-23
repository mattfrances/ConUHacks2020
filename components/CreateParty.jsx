import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import * as firebase from 'firebase';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export default class CreateParty extends Component {
    state = {
        partyCode: 0,
        password : "",
    }

    componentDidMount() {
        const roomsRef = firebase.database().ref(`rooms`)
        roomsRef.once('value',snap => {
          const rooms = Object.keys(snap.val())
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
                <Text style={styles.h1}>Your password is:</Text>
                <SmoothPinCodeInput
  cellSize={36}
  codeLength={4}
  value={this.state.password}
  onTextChange={password => this.setState({ password })}/>
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('Playing', {
                        roomId: this.state.partyCode,
                    })
                }>
                    <View style={styles.buttonContainer}>
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
        fontSize: 40,
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