import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

import { navigate } from '../../App'

const sources = {
  create: require('../../images/create.svg'),
  home: require('../../images/home.svg'),
  profile: require('../../images/profile.svg'),
  search: require('../../images/search.svg'),
  settings: require('../../images/settings.svg')
}

export default function Footer () {
  const Icon = props => (
    <View
      style={styles.icon}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => navigate(props.string)}>
      <SvgUri
        fill='#fff9f0'
        width={props.width || '30'}
        height={props.height || '30'}
        source={sources[props.string]} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Icon
        string='home' />
      <Icon
        width='28'
        height='28'
        string='search' />
      <Icon
        string='create' />
      <Icon
        width='26'
        height='26'
        string='profile' />
      <Icon
        width='26'
        height='26'
        string='settings' />
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
    maxHeight: 50
  },
  icon: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  }
})
