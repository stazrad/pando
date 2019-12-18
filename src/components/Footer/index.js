import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

import { navigate } from '../../App'

export default function Footer () {
  const Icon = props => {
    const source = '../../images/' + props.string + '.svg'
    console.log('SOURCE', source)
    // alert(source)
    return (
      <View
        style={styles.icon}
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => navigate(props.string)}>
        <SvgUri
          fill='white'
          width={props.width || '30'}
          height={props.height || '30'}
          source={require('../../images/home.svg')} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Icon string='home' />
      <View style={styles.icon}>
        <SvgUri
          fill='white'
          width='28'
          height='28'
          source={require('../../images/search.svg')} />
      </View>
      <View
        style={styles.icon}
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => navigate('create')}>
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
