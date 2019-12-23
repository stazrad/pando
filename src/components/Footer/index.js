import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

import { navigate } from '../../App'

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
        source={props.source} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Icon
        string='home'
        source={require('../../images/home.svg')} />
      <Icon
        width='28'
        height='28'
        string='search'
        source={require('../../images/search.svg')} />
      <Icon
        string='create'
        source={require('../../images/create.svg')} />
      <Icon
        width='26'
        height='26'
        string='profile'
        source={require('../../images/profile.svg')} />
      <Icon
        width='26'
        height='26'
        string='settings'
        source={require('../../images/settings.svg')} />
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
