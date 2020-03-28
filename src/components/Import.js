import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import SvgUri from 'react-native-svg-uri'

import { navigate } from 'App'
import PLUS_ICON from 'images/create.svg'
import Header from 'components/Header'
import Body from 'components/Body'
import Projects from 'components/Projects'

export default function Import (props) {
  const { onSetImage } = props
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      smartAlbums: ['Panoramas']
    })
    .then(image => {
      console.log('IAMGE', image.path);
      onSetImage(image)
      navigate('create')
    })
    .catch(console.warn)
  }
  console.log('RENDER')

  return (
    <>
      <Header style={{ backgroundColor: 'black' }} />
      <Body>
        <View style={styles.container}>
          <TouchableOpacity onPress={openPicker} style={{alignItems: 'center'}}>
            <SvgUri
              fill='white'
              width='80'
              height='80'
              source={PLUS_ICON} />
            <Text style={styles.text}>IMPORT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Projects />
        </View>
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    width: Dimensions.get('window').width
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 26,
    fontFamily: 'Oswald-Regular',
  }
})
