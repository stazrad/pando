import React, { useEffect, useState } from 'react'
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImagePicker from 'react-native-image-picker'
import SvgUri from 'react-native-svg-uri'

import { navigate } from 'App'
import PLUS_ICON from 'images/create.svg'
import Header from 'components/Header'
import Body from 'components/Body'
import Projects from 'components/Projects'

export default function Import (props) {
  const { onSetImage } = props
  const openPicker = () => {
    ImagePicker.launchImageLibrary({
      noData: true,
      mediaType: 'photo',
      smartAlbums: ['Panoramas'],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true
      }
    }, response => {
      if (response.didCancel) {
        return console.log('User cancelled image picker');
      } else if (response.error) {
        return console.log('ImagePicker Error: ', response.error);
      }

      let path = response.uri
      if (Platform.OS === 'ios') {
        path = '~' + path.substring(path.indexOf('/Documents'));
      }
      const { height, isVertical, latitude, timestamp, type, width } = response
      const image = {
        height,
        isVertical,
        latitude,
        path,
        timestamp,
        type,
        width,
      }

      console.log('response', response)

      onSetImage(image)
      navigate('create')
    })
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
