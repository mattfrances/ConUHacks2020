import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class PlayPauseNext extends PureComponent {
  render() {
    const {
      navigation, roomId, title, artist
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Search', {
          roomId
        })}
        >
          <Icon
            name="search"
            size={35}
            color="rgba(255, 255, 255, 0.72)"
          />
        </TouchableOpacity>
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('List queue.')}>
          <Icon
            name="menu"
            size={35}
            color="rgba(255, 255, 255, 0.72)"
          />
        </TouchableOpacity>
      </View>
    );
  }
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
