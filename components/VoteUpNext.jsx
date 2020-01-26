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

const VoteUpNext = () => (
  <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
    <TouchableOpacity onPress={() => console.log("Thumbs down pressed.")}>
        <Icon 
            name= "thumbs-down" 
            size={60} 
            color="#fff"
        />
    </TouchableOpacity>
    <View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Next From: Rap</Text>
      <Text style={styles.title}>Next Title</Text>
      <Text style={styles.artist}>Next Artist</Text>
    </View>
    
    <TouchableOpacity onPress={() => console.log("Thumbs up pressed.")}>
        <Icon 
            name= "thumbs-up" 
            size={60} 
            color="#fff"
        />
    </TouchableOpacity>
  </View>
);

export default VoteUpNext;

const styles = StyleSheet.create({
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
});
