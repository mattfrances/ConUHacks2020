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
    constructor(props) {
        super(props);

        this.state = {
            thumbsDownPressed: false,
            thumbsUpPressed: false,
        }
    }

    onDownVotePressed = () => {
        console.log("Thumbs down pressed.");
            this.setState(prevState => ({
                thumbsUpPressed:false,
                thumbsDownPressed: !prevState.thumbsDownPressed
              }));
        
    }

    onUpVotePressed = () => {
        console.log("Thumbs up pressed.");
            this.setState(prevState => ({
                thumbsDownPressed: false,
                thumbsUpPressed: !prevState.thumbsUpPressed
                }));
        
    }

    render() {
        return (
            <View style={{flex:1, margin:0,flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.onDownVotePressed()}>
                    <Icon 
                        name= "thumbs-down" 
                        size={60} 
                        color={this.state.thumbsDownPressed ? "#ff0000" : "#fff"}
                    />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                {this.props.genre && 
                    <Text style={styles.title}>Next Up:</Text>
                }
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.artist}>{this.props.artist}</Text>
                </View>
                
                <TouchableOpacity onPress={() => this.onUpVotePressed()}>
                    <Icon 
                        name= "thumbs-up" 
                        size={60} 
                        color={this.state.thumbsUpPressed ? "#33cc33" : "#fff"}
                    />
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
