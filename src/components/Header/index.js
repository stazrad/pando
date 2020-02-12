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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 120,
    paddingTop: 16
  },
  logo: {
    width: 180,
    height: 32,
  },
  logoContainer: {
    marginTop: 18,
    padding: 20,
    flex: 1
  }
})
