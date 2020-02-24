import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Queue from './Queue'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class TrackDetails extends Component {

  state = {
    visible: false
  }
  render() {
    const {songs , onDownvote} = this.props
    const { visible } = this.state
    return (
      <View>
        <Queue songs={songs} onDownvote={onDownvote} visible={visible} onClose = {() => this.setState({visible:false})} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {
                        roomId: this.props.roomId
                    })}>
            <Icon 
                name= "search" 
                size={35} 
                color="rgba(255, 255, 255, 0.72)"
            />
        </TouchableOpacity>
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.artist}>{this.props.artist}</Text>
        </View>
        <TouchableOpacity onPress={() => this.setState({visible:true})}>
            <Icon 
                name= "menu" 
                size={35} 
                color="rgba(255, 255, 255, 0.72)"
            />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
_hideModal = () => {
this.setState({visible:false})
}

// const TrackDetails = ({
//   title,
//   artist,
//   onAddPress,
//   onMorePress,
//   onTitlePress,
//   onArtistPress,
// }) => (
//   <View style={styles.container}>
//     <TouchableOpacity onPress={() => navigation('Search')}>
//         <Icon 
//             name= "search" 
//             size={35} 
//             color="rgba(255, 255, 255, 0.72)"
//         />
//     </TouchableOpacity>
//     <View style={styles.detailsWrapper}>
//       <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
//       <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
//     </View>
//     <TouchableOpacity onPress={() => console.log("List queue.")}>
//         <Icon 
//             name= "menu" 
//             size={35} 
//             color="rgba(255, 255, 255, 0.72)"
//         />
//     </TouchableOpacity>
//   </View>
// );

// export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
    justifyContent: 'space-around',
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.72)',
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
