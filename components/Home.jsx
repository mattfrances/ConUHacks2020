import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default class HomePage extends React.Component {
  render() {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'} }>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Playing')}>
          <Card containerStyle={styles.card}>
            <Text>DRIVE</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Playing')}>
          <Card containerStyle={styles.card}>
            <Text>PARTY</Text>
          </Card>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  card: {
    // paddingTop: 35,
    // paddingBottom: 35,
    // paddingLeft: 75,
    // paddingRight: 75,
  },
});
