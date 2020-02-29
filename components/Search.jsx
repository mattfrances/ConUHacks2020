/*This is an Example of SearchBar in React Native*/
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
 
} from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
import axios from 'axios';
import Header from './Header';
import Icon from 'react-native-vector-icons/Feather';


export default class App extends React.Component {
  
    //setting default state
    state = {
      arrayholder: [],
      isLoading: true,
      search: '',
      data: [],
      selectedSong: {},
    };
  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.setState({arrayholder:responseJson})
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleOnClick = (item) => {
    const { onAdd , songs } = this.props.navigation.state.params

    const foundSong = songs.find(s => s.id === item.id)
      //returns an objo if true or undef if false
    if(foundSong){
      alert('That song is already there!')
      return false
    }

    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs/' + item.id, {
      headers: {
        "Authorization": "d22886a9e467526d4cbe6328fe07285d"
      }
    })
    .then(response => {
      // console.log("RESPONSE")
      // console.log(response.data.playUrl)
      // console.log(response.data.artist)
      //pray that res has artwork of good size
      // TODO if we care, just take the highest num in arr of jackets
      item.artwork = response.data.artist.jackets["250"] || response.data.artist.jackets["290"] || response.data.artist.jackets["200"] || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
      // console.log(response.data.artist.jackets)
      item.uri = response.data.playUrl
      item.downvotes = 0
      item.upvotes = 0
      item.ratio = 0
      
      console.log(this.filterFunc(item))
      if(!this.filterFunc(item)){
        alert("Sorry, that can't be played")
        return false
      }
      
      this.setState({
        selectedSong: item
      });
      // console.log("SELECTED SONG")
      // console.log(this.state.selectedSong);
      // ah mate you need to ensure that the state is stable, this component doesnt need to store song in state
      onAdd(item)
      this.props.navigation.goBack();
    }
      );

  }

  // addSongToQueue = () => {
  //   console.log("adding song to queue")
   
  //   alert(this.state.selectedSong.title + " by " + this.state.selectedSong.artistName + " added to Queue")

  //   // console.log("ROOOOM ID: " + this.props.navigation.getParam('roomId'));
  //   console.log("IN ADDSONGTOQUEUE")
  //   console.log(this.state.selectedSong)
  //   // axios.post('http://5b25f14e.ngrok.io/add', {
  //   //   "roomId": this.props.navigation.getParam('roomId'),
  //   //   "song": this.state.selectedSong
  //   // })
  //   // .then(res => {
  //   // })
  // }


  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  filterFunc = (s)=> {
    const keys = Object.keys(s)
    let good = true
    keys.forEach(key => {
      if(s[key]===0){
        // do nothing 0 evaluates to false
        //mf javascript...
      }
      else if(!s[key]){
        good = false
        return false
      }
      
    })
    if(!good){
      console.log(s)
      return false
    }
    else {
      // console.log('true')
      return true
    }
  }


  SearchFilterFunction(text) {
    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs', {
      params: {
        "query": text
      },
      headers: {
        "Authorization": "d22886a9e467526d4cbe6328fe07285d"
      }
    })
    .then(response => {
      const songs = response.data.songs;

      
      // unnecessary TODO RM we need to nope in the item
      const s = songs.filter(canson => this.filterFunc(canson))
      // songs.forEach((song, index) => {
      //   // if any part of the song is false we reject because firebase no like and its unstable af
      //   const keys = Object.keys(song)
      //   // console.log(keys)
      //   let badFound = false
      //   keys.forEach(k => {
      //     console.log(k)
      //     // console.log(songs[k])
      //     if(!songs[k]){
      //       badFound = true
      //     }
      //   })
      //   if(badFound){
      //       continue
      //   }
      //   //song.artwork = getSongArtwork(song.id) // call a function here to get the artwork
      //   dataSongs.push(song);

      //   // const value =  await this.getSongArtwork(song.id);
      //   // console.log(value);
      // });
      this.setState({
        data: s
      });
    });

    //passing the inserted text in textinput
    const newData = this.state.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }


  // Finds the song artwork given a song ID
  // getSongArtwork(id) {
  //   const test = axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs/69253803', {
  //     headers: {
  //       "Authorization": "af7a95c83d730ce7697c6901c3f63c47"
  //     }
  //   });

  //   return test;
  // }


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      // Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20, backgroundColor:'black'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <SafeAreaView style={styles.viewStyle}>
        <Header 
          // message="Playing From Charts"
          navigation = {this.props.navigation}
        />
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleOnClick(item)}>
              <Card containerStyle={styles.card} >
                <Text style={styles.textStyle}>{item.title} by {item.artistName}</Text>
              </Card>
            </TouchableOpacity>
          )}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: Expo.Constants.statusBarHeight,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  textStyle: {
    padding: 5,
    color: 'white',
    fontSize: 16,
  },
  card: {
    borderWidth: 0,
    backgroundColor: 'black',
    margin: 0,
    borderColor: 'green',
  },
});
