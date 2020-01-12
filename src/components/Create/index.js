import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Cropper from './Cropper'

export default function Create () {
  const [ photo, setPhoto ] = useState(null)
  const DEVICE_WIDTH = Dimensions.get('window').width

  // useEffect(() => {
  //   if (!photo) {
  //     ImagePicker.openPicker({
  //       mediaType: 'photo',
  //       smartAlbums: ['Panoramas']
  //     }).then(image => {
  //       console.log('IAMGE', image);
  //       setPhoto(image)
  //     })
  //     // CameraRoll.getPhotos({
  //     //   first: 5,
  //     //   assetType: 'Photos'
  //     // })
  //     // .then(res => {
  //     //   console.log('PHOTOS', res.edges)
  //     //   setPhotos(res.edges)
  //     // })
  //     // .catch(e => console.log('GET PHOTOS ERROR', e))
  //   }
  // })

  return (
    <View style={styles.container}>
      <Text>Select a pano:</Text>
      <Cropper url={photo && photo.url} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 600,
    width: Dimensions.get('window').width
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10
  }
})
