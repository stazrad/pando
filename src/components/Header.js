import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import LOGO_BLACK from 'images/PANDO_BLACK.png'
import LOGO_WHITE from 'images/PANDO.png'

export default function Header (props) {
  const { style = { backgroundColor: 'black' } } = props
  const logo = style.backgroundColor === 'black' ? LOGO_WHITE : LOGO_BLACK

  return (
    <View style={{...style, ...styles.container}}>
      <ImageBackground
        style={styles.logo}
        source={logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    maxHeight: 48
  },
  logo: {
    width: 170,
    alignSelf: 'center',
    height: 28,
    marginTop: 16,
    padding: 10,
  }
})
