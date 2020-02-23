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

const thisIsAList = [
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
    {
        title: "Song1",
        Artist: "ARtis1"
    },
]

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
        if (!this.state.thumbsUpPressed) {
            this.setState(prevState => ({
                thumbsDownPressed: !prevState.thumbsDownPressed
              }));
        }
    }

    onUpVotePressed = () => {
        console.log("Thumbs up pressed.");
        if (!this.state.thumbsDownPressed) {
            this.setState(prevState => ({
                thumbsUpPressed: !prevState.thumbsUpPressed
                }));
        }
    }

    render() {
        return (
            <React.Fragment>
            
                {/* {thisIsAList.forEach(item => {
                    return (
                        
                        
                    )
                })} */}

            </React.Fragment>
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
