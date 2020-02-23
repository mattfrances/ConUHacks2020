import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, StatusBar, SafeAreaView, HeaderBackButton, Button } from 'react-native'
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SearchAndQueue from './SearchAndQueue';
import VoteUpNext from './VoteUpNext';
import axios from 'axios';
import PlayPauseNext from './PlayPauseNext';

const audioBookPlaylist = [
	{
		title: 'Life Is Good',
		author: 'Future',
		uri:
			'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
		imageSource: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4bb82b72535211.5bead62fe26d5.jpg'
	},
	{
		title: 'Hamlet - Act II',
		author: 'William Shakespeare',
		uri:
			'https://drive.google.com/uc?export=download&id=1_aXMXriqDj-Mki5cm3ZLXNhHua3VE6KH',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
]

export default class MusicPlayer extends React.Component {
    state = {
		isPlaying: false,
		// playbackInstance: null, now a prop for safe unmount
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}

		async componentDidMount() {
			try {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: false,
					interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
					playsInSilentModeIOS: true,
					interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
					shouldDuckAndroid: true,
					staysActiveInBackground: true,
					playThroughEarpieceAndroid: false
				})
	
				this.loadAudio()
			} catch (e) {
				console.log(e)
			}
		}
	async componentWillUnmount() {
		const  playbackInstance  = this.props.screenProps.playbackInstance
		await playbackInstance.unloadAsync()
		
	}


	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		const roomId = this.props.navigation.getParam('roomId');
		// console.log(this.props.screenProps.data[roomId].songs);

		try {
			const playbackInstance = this.props.screenProps.playbackInstance
			const source = {
				uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3'
			}


			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			// playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			// this.setState({
			// 	playbackInstance
			// })
		} catch (e) {
			console.log(e)
		}

		this.handlePlayPause()
	}

	// onPlaybackStatusUpdate = status => {
	// 	this.setState({
	// 		isBuffering: status.isBuffering
	// 	})
	// }

	handlePlayPause = async () => {
		const { isPlaying} = this.state
		const  playbackInstance  = this.props.screenProps.playbackInstance
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
		const { isPlaying} = this.state
		const  playbackInstance  = this.props.screenProps.playbackInstance
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}
	}

	handleNextTrack = async () => {
		const { isPlaying} = this.state
		const  playbackInstance  = this.props.screenProps.playbackInstance
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}
	}

	renderFileInfo() {
		const { isPlaying} = this.state
		const  playbackInstance  = this.props.screenProps.playbackInstance

		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
			</View>
		) : null
	}
	
	onBackButtonPressed = () => {
		this.handlePlayPause()
		this.props.navigation.goBack()
	}
	
	render() {

        let currentIndex = 0;

		return (
            <SafeAreaView style={styles.container}>
                
            <StatusBar hidden={false} barStyle="light-content"/>
          
			
            <View style={styles.headerContainer}>
                <Ionicons name='ios-arrow-back' style={styles.headerIcon} onPress={this.onBackButtonPressed}/>
                <Text style={styles.headerMessage}>Now Playing</Text>
            </View>

            <AlbumArt 
                url="https://static.stereogum.com/uploads/2020/01/future-drake-life-is-good-1578632849-640x640.jpg"
            />
			{/* <PlayPauseNext /> */}
            <TrackDetails title={audioBookPlaylist[this.state.currentIndex].title} artist={audioBookPlaylist[this.state.currentIndex].author} navigation={this.props.navigation} roomId={this.props.navigation.getParam('roomId')} />
            <VoteUpNext genre title="HUMBLE" artist="Kendrick Lamaar"/>
            </SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	backgroundColor: '#fff',
	// 	alignItems: 'center',
	// 	justifyContent: 'center'
    // },
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
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
        position: "relative",
        top: 0,
        left: 115,
      },
      headerIcon: {
        fontSize: 32,
        color: '#444',
      },
})