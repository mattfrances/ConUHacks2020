/*This is an Example of SearchBar in React Native*/
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { 
      isLoading: true, 
      search: '',
      data: [],
      temp: '',
      selectedSong: {},
    };
    this.arrayholder = []
  }
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
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleOnClick = (item) => {
    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs/' + '69253803', {
      headers: {
        "Authorization": "af7a95c83d730ce7697c6901c3f63c47"
      }
    })
    .then(response => {
      item.artwork = response.data.artist.jackets["50"]
      console.log(item)

      const sendThisToBackend = {
        mode: "drive",
        channel: "rap",
        song: item
      }

      console.log(sendThisToBackend)
    });
  }


  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };


  SearchFilterFunction(text) {
    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs', {
      params: {
        "query": text
      },
      headers: {
        "Authorization": "af7a95c83d730ce7697c6901c3f63c47"
      }
    })
    .then(response => {
      const songs = response.data.songs;
      let dataSongs = [];
      songs.forEach((song, index) => {
        //song.artwork = getSongArtwork(song.id) // call a function here to get the artwork
        console.log(song);
        dataSongs.push(song);

        // const value =  await this.getSongArtwork(song.id);
        // console.log(value);
      });
      this.setState({
        data: dataSongs
      });
    });

    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
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
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
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
              <Card>
                <Text style={styles.textStyle}>{item.title} by {item.artistName}</Text>
              </Card>
            </TouchableOpacity>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    padding: 10,
  },
});
