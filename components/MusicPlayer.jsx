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

const audioBookPlaylist = [
	{
		title: 'Lets get it',
		author: 'The boys',
		uri:
			'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
		title: 'Hamlet - Act II',
		author: 'William Shakespeare',
		uri:
			'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
]

export default class MusicPlayer extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
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

    componentWillUnmount() {
        this.handlePlayPause
    }

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: audioBookPlaylist[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		});
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
        this.setState({
            isPlaying: false
        });

        let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}
    }
    
	handleNextTrack = async () => {
        this.setState({
            isPlaying: false
        });

		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}
    }

	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
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

    static navigationOptions = {
        headerTitle: "TEST",
    };

	render() {

        let currentIndex = 0;

		return (
			// <View style={styles.container}>
            //     <TouchableOpacity
            //         onPress={() => this.props.navigation.navigate('Search')}
            //         style={{
            //             borderWidth:1,
            //             borderColor:'rgba(0,0,0,0.2)',
            //             alignItems:'center',
            //             justifyContent:'center',
            //             width:70,
            //             position: 'absolute',                                          
            //             top: 10,                                                    
            //             left: 10,
            //             height:70,
            //             backgroundColor:'#fff',
            //             borderRadius:100,
            //             }}
            //     >
            //         <Icon name="search"  size={30} color="#01a699" />
            //     </TouchableOpacity>
			// 	<Image
			// 		style={styles.albumCover}
			// 		source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
			// 	/>
			// 	<View style={styles.controls}>
			// 		<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
			// 			<Ionicons name='ios-skip-backward' size={48} color='#444' />
			// 		</TouchableOpacity>
			// 		<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
			// 			{this.state.isPlaying ? (
			// 				<Ionicons name='ios-pause' size={48} color='#444' />
			// 			) : (
			// 				<Ionicons name='ios-play-circle' size={48} color='#444' />
			// 			)}
			// 		</TouchableOpacity>
			// 		<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
			// 			<Ionicons name='ios-skip-forward' size={48} color='#444' />
			// 		</TouchableOpacity>
			// 	</View>
            //     <View style={styles.trackInfo}>
            //         <Text style={[styles.trackInfoText, styles.largeText]}>
            //             {audioBookPlaylist[this.state.currentIndex].title}
            //         </Text>
            //         <Text style={[styles.trackInfoText, styles.smallText]}>
            //             {audioBookPlaylist[this.state.currentIndex].author}
            //         </Text>
			//     </View>
			// 	{/* {this.renderFileInfo()} */}
			// </View>

            <SafeAreaView style={styles.container}>
            {/* <HeaderBackButton onPress={() => navigation.goBack(null)} /> */}
            <StatusBar hidden={false} barStyle="light-content"/>
            <Header 
                message="Playing From Charts"
                navigation = {this.props.navigation}
            />
            <AlbumArt 
                url="http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg"
            />
            <TrackDetails title='Current Title' artist='Current Artist' navigation={this.props.navigation}/>
            <VoteUpNext />
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
})