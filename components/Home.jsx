import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class HomePage extends PureComponent {
  render() {
    const { navigation } = this.props
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>houseParty</Text>
        <View>

          <TouchableOpacity onPress={() => navigation.navigate('JoinParty')}>
            <View style={styles.buttonContainer}>
              <Text
                style={styles.button}
              // onPress={() => this.onPress()}
                color="#fff"
              >
                Join Party
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CreateParty')}>
            <View style={styles.buttonContainer}>
              <Text
                style={styles.button}
              // onPress={() => this.onPress()}
                color="#fff"
              >
                Create Party
              </Text>
            </View>
          </TouchableOpacity>

        </View>
        {/* <Text style={styles.h2}>giving you the power to be the life of the party</Text> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
  h1: {
    color: 'white',
    fontSize: 50,
  },
  h2: {
    color: '#FAE042',
    fontSize: 18,
    marginTop: 8,
  },
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 30,
    margin: 8,
    alignItems: 'center',
  },
  button: {
    fontSize: 40,
    color: 'white',
  }
});
