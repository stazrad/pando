import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LOGO from '../../images/PANDO.png'

export default function Header () {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={LOGO} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 80,
    paddingTop: 16
  },
  logo: {
    width: 180,
    height: 32,
  },
  logoContainer: {
    marginTop: 8,
    padding: 10,
    flex: 1
  }
})
