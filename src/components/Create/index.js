import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

export default function Footer () {
  CameraRoll.getPhotos({
    first: 20,
    assetType: 'Photos',
  })
  .then(res => {
    console.log('PHOTOS', res)
  })
  .catch(e => console.log('GET PHOTOS ERROR', e))

  return (
    <View style={styles.container}>
      <Text>CREATE NEW</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100
  },
})
