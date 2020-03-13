import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import LOGO_BLACK from 'images/PANDO_BLACK.png'
import LOGO_WHITE from 'images/PANDO.png'

export default function Header (props) {
  const { style = { backgroundColor: 'black' } } = props
  const logo = style.backgroundColor === 'black' ? LOGO_WHITE : LOGO_BLACK

  return (
    <View style={{...styles.container, ...style}}>
        <Image
          style={styles.logo}
          source={logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    maxHeight: 48
  },
  logo: {
    width: 120,
    height: 30,
    marginTop: 4,
    padding: 10,
    backgroundColor: 'purple'
  }
})
