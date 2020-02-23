import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class JoinParty extends Component {

    state = {
        code: '',
        password: '',
      };
      pinInput = React.createRef();
    
      _checkCode = (code) => {
        if (code != '1234') {
          this.pinInput.current.shake()
            .then(() => this.setState({ code: '' }));
        }
      }

    render() {

        const { code, password } = this.state;

        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.h1}>Enter your party code:</Text>
                {/* <SmoothPinCodeInput
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: 'gray',
            }}
            cellStyleFocused={{
              borderColor: 'white',
            }}
            value={code}
            onTextChange={code => this.setState({ code })}
            /> */}
                 {/* underline */}
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
            value={code}
            onTextChange={code => this.setState({ code })}
            onFulfill={() => this.props.navigation.navigate("Playing")}
            />
        </View>
                
               
               
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Playing')}>
                    <View style={styles.buttonContainer}>
                    <Text
                    style={styles.button}
                    // onPress={() => this.onPress()}
                    color="#fff"
                    >
                    Get Started
                    </Text>
                </View>
                </TouchableOpacity> */}
                
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