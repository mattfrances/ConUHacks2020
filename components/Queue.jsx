import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VoteUpNext from './VoteUpNext';


export default class Queue extends Component {
    
    render() {
      const {visible, songs, onClose, onDownvote, onUpvote} = this.props
    //   const { songs, onDownvote } = navigation.state.params
      return (
          <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={onClose}
          >
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Ionicons name="ios-arrow-back" style={styles.headerIcon} onPress={onClose} />
            <Text style={styles.headerMessage}>Queue</Text>
          </View>
          {songs && songs.length === 0  && <Text style={{color:"white"}} > "Add songs to start the party"</Text>}
          {songs && songs.map((song) => 
          <VoteUpNext key={song.uid} 
          locallyUpvoted ={song.locallyUpvoted}
          locallyDownvoted ={song.locallyDownvoted}
          title={song.title}
          artist={song.artist}
          onDownvote={onDownvote}
          onUpvote={onUpvote}
          uid = {song.uid}
              upvotes={song.upvotes}
              downvotes={song.downvotes}/>)}
        </SafeAreaView>
        </Modal>
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
