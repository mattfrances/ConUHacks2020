import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, StatusBar, SafeAreaView, Button } from 'react-native'
// import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import VoteUpNext from './VoteUpNext';
import * as firebase from 'firebase'; 

const myData = [
	{
	  title: 'HUMBLE',
	  artist: 'Kendrick',
	  upvotes: 0,
	  downvotes: 0,
	  uid:0
	},
	{
	  title: 'Foo',
	  artist: 'Bar',
	  upvotes: 0,
	  downvotes: 0,
	  uid:1
	},
	{
	  title: 'One',
	  artist: 'Marley',
	  upvotes: 0,
	  downvotes: 0,
	  uid:2
	},
	{
	  title: 'Kill',
	  artist: 'Menow',
	  upvotes: 0,
	  downvotes: 0,
	  uid:3
	},
	{
	  title: 'Song',
	  artist: 'Artist',
	  upvotes: 0,
	  downvotes: 0,
	  uid:4
	},
	{
	  title: 'Song',
	  artist: 'Artist',
	  upvotes: 0,
	  downvotes: 0,
	  uid:5
	},
	{
	  title: 'Song',
	  artist: 'Artist',
	  upvotes: 0,
	  downvotes: 0,
	  uid:6
	},
	{
	  title: 'Song',
	  artist: 'Artist',
	  upvotes: 0,
	  downvotes: 0,
	  uid:7
	},
  ];

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
        roomInfo:null,
		currentIndex: 0,
		songArray : myData,
	}

	roomsRef = firebase.database().ref('rooms').child(this.props.navigation.state.params.roomInfo.partyCode)

		componentDidMount() {
			this.setState({roomInfo: this.props.navigation.state.params.roomInfo})

			//Since we don't have the api yet
			this.roomsRef.child('songs').set(this.state.songArray)
			this. roomsRef.on('value', (snap) => {
			 // console.log(snap.val())
			  this.setState({
				  songArray: snap.val().songs ? snap.val().songs : []
			  })
			})
        }

	renderFileInfo() {
		const  playbackInstance  = this.props.screenProps.playbackInstance
		//fix this or remove
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
		this.props.navigation.goBack()
	}

	_onDownvote = (id,downPressed, upPressed) => {
		this.roomsRef.child('songs').once('value', (snap) => {
			let s = snap.val()
			const i = s.findIndex(x => x.uid === id)
			let dw
			let uw = s[i].upvotes
			if(downPressed){
				dw = s[i].downvotes - 1
			}
			else if(upPressed){
				dw = s[i].downvotes + 1
				uw = s[i].upvotes - 1
			}
			else{
				dw = s[i].downvotes + 1
			}
			this.roomsRef.child('songs').child(i).child('downvotes').set(dw)
			this.roomsRef.child('songs').child(i).child('upvotes').set(uw)
		})
	}
	
	_onUpvote = (id, upPressed, downPressed) => {
		this.roomsRef.child('songs').once('value', (snap) => {
			let s = snap.val()
			const i = s.findIndex(x => x.uid === id)
			let uw
			let dw = s[i].downvotes
			if(downPressed){
				dw = s[i].downvotes - 1
				uw = s[i].upvotes + 1
			}
			else if(upPressed){
				uw = s[i].upvotes - 1
			}
			else{
				uw = s[i].upvotes + 1
			}
			this.roomsRef.child('songs').child(i).child('downvotes').set(dw)
			this.roomsRef.child('songs').child(i).child('upvotes').set(uw)
		})
	}

	render() {

        let currentIndex = 0;

    const {roomInfo, songArray} =this.state
    
		
		return (
            <SafeAreaView style={styles.container}>
            
            <StatusBar hidden={false} barStyle="light-content"/>

			
            <View style={styles.headerContainer}>
                <Ionicons name='ios-arrow-back' style={styles.headerIcon} size={42} onPress={this.onBackButtonPressed}/>
                <Text style={styles.headerMessage}>Now Playing</Text>
            </View>

            <AlbumArt 
                url="https://static.stereogum.com/uploads/2020/01/future-drake-life-is-good-1578632849-640x640.jpg"
            />
			{/* <PlayPauseNext /> */}
            <TrackDetails 
            title={audioBookPlaylist[this.state.currentIndex].title} 
            artist={audioBookPlaylist[this.state.currentIndex].author} 
            navigation={this.props.navigation}
            songs = {this.state.songArray}
            onUpvote = {this._onUpvote}
            onDownvote = {this._onDownvote}
            />
			
		    <VoteUpNext genre title={songArray && songArray[0] && songArray[0].title || "Add a song"} artist={ songArray && songArray[0] && songArray[0].artist || "Something goes here"} onDownvote={this._onDownvote} onUpvote={this._onUpvote} upvotes={songArray && songArray[0] && songArray[0].upvotes || 0} downvotes = {songArray && songArray[0] && songArray[0].downvotes || 0} uid = {songArray && songArray[0] && songArray[0].uid}/>
			<Button title="Get Room Info" onPress={() => this.props.navigation.navigate("RoomInfo", {
                roomInfo: {
                    partyCode: roomInfo.partyCode,
                    password: roomInfo.password
                },
            })}/>
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
		paddingTop: Expo.Constants.statusBarHeight,
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
        flex: 1,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerIcon: {
        // fontSize: 32,
        color: '#444',
	  },
	  control: {
		flex:1,
		alignItems:"center",
		flexDirection: 'column',
	},
})