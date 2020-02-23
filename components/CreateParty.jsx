import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';


export default class CreateParty extends Component {
    state = {
        partyCode: 0,
    }

    componentDidMount() {
        console.log("MOUNTED")
        // axios.get('http://5b25f14e.ngrok.io/')
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        // axios.post('http://5b25f14e.ngrok.io/create', {
        //     "password": "1111",
        // })
        // .then(res => {
        //     this.setState({
        //         partyCode: res.data
        //     })
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.h1}>Your party code is:</Text>
                <Text style={styles.h1}>{this.state.partyCode}</Text>
                <Text style={styles.h1}>Your password is:</Text>
                <Text style={styles.h1}>1111</Text>
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