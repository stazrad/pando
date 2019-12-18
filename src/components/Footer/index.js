import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

import Pagoda from '../../images/pagoda.svg'

export default function Footer () {
  return (
    <View style={styles.container}>
      <View style={styles.icon}><SvgUri source={require('../../images/pagoda.svg')} /></View>
      <Text style={styles.icon}>Home</Text>
      <Text style={styles.icon}>Profile</Text>
      <Text style={styles.icon}>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100
  },
  icon: {
    flex: 1,
    display: 'flex'
  }
})
