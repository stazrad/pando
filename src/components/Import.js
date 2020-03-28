import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
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
      // includeBase64: true,
      includeExif: true,
      writeTempFile: false,
      mediaType: 'photo',
      smartAlbums: ['Panoramas']
    })
    .then(image => {
      console.log('cropped IMAGe', image)
      const opts = {
        first: 1,
        assetType: 'Photos',
        fromTime: image.creationDate,
        toTime: image.creationDate,
      }

      return CameraRoll.getPhotos(opts)
    })
    .then(r => {
      console.log('IAMGE', r.edges.length, { ...r.edges[0].node })

      return { ...r.edges[0].node.image, path: r.edges[0].node.image.uri }
    })
    .then(image => {
      onSetImage(image)
      navigate('create')
    })
    .catch(console.warn)
  }

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
          <Projects onSetImage={onSetImage} />
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
