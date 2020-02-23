import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const SearchAndQueue = () => (
  <View style={{flex:0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
    <TouchableOpacity onPress={() => console.log("Thumbs down pressed.")}>
        <Icon 
            name= "menu" 
            size={30} 
            color="rgba(255, 255, 255, 0.72)"
        />
    </TouchableOpacity>
    <View style={{ alignItems: "center" }}></View>
    <TouchableOpacity onPress={() => console.log("Thumbs up pressed.")}>
        <Icon 
            name= "search" 
            size={30} 
            color="rgba(255, 255, 255, 0.72)"
        />
    </TouchableOpacity>
  </View>
);

export default SearchAndQueue;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  }
});
