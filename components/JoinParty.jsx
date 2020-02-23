import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Scanner from "./Scanner"
import * as firebase from 'firebase';


export default class JoinParty extends Component {

    state = {
        partyCode: '',
        password: '',
        canProceed:false,
      }

    render() {
        const { partyCode, password } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.h1}>Enter your party partyCode:</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Underline</Text>
          <SmoothPinCodeInput
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: 'white',
            }}
            cellStyleFocused={{
              borderColor: 'white',
            }}
            value={partyCode}
            codeLength={5}
            onTextChange={partyCode => this.setState({ partyCode })}
            />

</View>
<View style={styles.section}>
<Text style={styles.h1}>Enter your party password:</Text>

        <SmoothPinCodeInput
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: 'white',
            }}
            cellStyleFocused={{
              borderColor: 'white',
            }}
            codeLength={4}
            value={password}
            onTextChange={this._handlePwChange}
            />
                </View>

                <TouchableOpacity 
                disabled={!this.state.canProceed}
                onPress={this._tryToEnterRoom}>
                    <View style={this.state.canProceed ? styles.buttonContainer : {...styles.buttonContainer, backgroundColor: "#dddddd"} }>
                    <Text
                    style={styles.button}
                    color="#fff"
                    >
                    Join the Party!
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                disabled={!this.state.canProceed}
                onPress={()=> console.log("do somethin here")}>
                    <View  style={styles.buttonContainer1}>
                    <Text
                    style={styles.button}
                    onPress={this._routeToQR}
                    color="#fff"
                    >
                      Scan QR Code!
                    </Text>
                </View>
                </TouchableOpacity>
            <Scanner />
            </SafeAreaView>
        );
    }

    _routeToQR = () =>{
        this.props.navigation.navigate('Scanner', {
            onScanSuccess: this._onScanSuccess,
        })
    }

    _onScanSuccess = (data) => {
        const jsonDat = JSON.parse(data)
        this.setState({
            partyCode : jsonDat.partyCode.toString(),
            password : jsonDat.password,
            canProceed : true,
        })
        this.props.navigation.navigate('JoinParty')
    }

    _tryToEnterRoom = () => {
        const{partyCode,password} = this.state
        const roomsRef = firebase.database().ref(`rooms`)
        roomsRef.once('value',snap => {
          let rooms =  snap.val() ? Object.keys(snap.val()) : []
        
          if(rooms.indexOf(partyCode) === -1){
              alert("That room does not exist...")
          }
          else if(snap.val()[partyCode].password !== password){
                alert("That password is incorrect...")
            }
            else{
                this._initRoom()
            }

        })
    }

    _initRoom = () => {
      const {partyCode ,password, canProceed} = this.state
     if(canProceed){
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
        paddingTop: Expo.Constants.statusBarHeight,
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
    buttonContainer1: {
        backgroundColor: '#008F68',
        borderRadius: 5,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 1
    },
    button: {
        fontSize: 20,
        color: 'white',
    },
    section: {
        alignItems: 'center',
        margin: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});