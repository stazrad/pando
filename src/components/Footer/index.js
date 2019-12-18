import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

export default function Footer () {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='30'
          height='30'
          source={require('../../images/pagoda.svg')} />
      </View>
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='28'
          height='28'
          source={require('../../images/search.svg')} />
      </View>
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='30'
          height='30'
          source={require('../../images/create.svg')} />
      </View>
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='26'
          height='26'
          source={require('../../images/profile.svg')} />
      </View>
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='26'
          height='26'
          source={require('../../images/settings.svg')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60
  },
  icon: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  }
})
