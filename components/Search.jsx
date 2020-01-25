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
    console.log(item)
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };


  SearchFilterFunction(text) {
    // get list of songs
    // add them to the data array

    // console.log(text);
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
      // console.log(songs);

      let dataSongs = [];
      // console.log(this.state.data);
      songs.forEach(song => {
        dataSongs.push(song);
      });

      // console.log(dataSongs);
      this.setState({
        data: dataSongs
      });

      // console.log(this.state.data);
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
  findSongArtwork(id) {
    axios.get('https://conuhacks-2020.tsp.cld.touchtunes.com/v1/songs/69253803', {
      headers: {
        "Authorization": "af7a95c83d730ce7697c6901c3f63c47"
      }
    })
    .then(response => {
      const albumCover = response.data.album.jackets['50']
      // console.log(response.data.album.jackets['50'])
      this.setState({
        temp: albumCover
      })
      // this.state.temp = albumCover
      console.log(this.state.temp)
    });
  }


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
        {/* <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
        /> */}
        {this.findSongArtwork(69253803)}
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.temp}}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
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
