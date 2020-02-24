import React, { PureComponent } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Header extends PureComponent {
  render() {
    const { navigation, title } = this.props;
    return (
      <View style={styles.container}>
        <Ionicons name="ios-arrow-back" style={styles.icon} onPress={() => navigation.goBack()} />
        <Text style={styles.message}>{title || 'houseParty'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // eslint-disable-next-line no-undef
    paddingTop: Expo.Constants.statusBarHeight,
    height: 72,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 20,
    top: 0,
  },
  icon: {
    color: '#0000',
  },
  button: {
    opacity: 0.72
  }
});
