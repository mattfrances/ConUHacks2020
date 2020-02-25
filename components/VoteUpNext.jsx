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

export default class VoteUpNext extends Component {
       

    onDownVotePressed = (i) => {
        const { onDownvote ,locallyUpvoted, locallyDownvoted} = this.props
        //pass a unique id to downvote ideally
        onDownvote(i,locallyUpvoted,locallyDownvoted)
        
    }

    onUpVotePressed = (i) => { 
        const { onUpvote ,locallyUpvoted, locallyDownvoted} = this.props
        //pass a unique id to downvote ideally
        onUpvote(i,locallyUpvoted,locallyDownvoted)    }

    render() {
        const {title , artist, upvotes, downvotes, uid, locallyUpvoted, locallyDownvoted} = this.props
        console.log(this.props)
        return (
            <View style={{flex:1, margin:0,flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.onDownVotePressed(uid)}>
                    <Icon 
                        name= "thumbs-down" 
                        size={60} 
                        color={locallyDownvoted ? "#ff0000" : "#fff"}
                    />
                    <Text style={styles.artist}>{downvotes || 0}</Text>
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                {this.props.genre && 
                    <Text style={styles.title}>Next Up:</Text>
                }
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.artist}>{artist}</Text>
                </View>
                
                <TouchableOpacity onPress={() => this.onUpVotePressed(uid)}>
                    <Icon 
                        name= "thumbs-up" 
                        size={60} 
                        color={locallyUpvoted ? "#33cc33" : "#fff"}
                    />
                    <Text style={styles.artist}>{upvotes || 0}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
