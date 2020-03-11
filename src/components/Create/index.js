import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
// import SvgUri from 'react-native-svg-uri'
import Cropper from './Cropper'
import Example from './Example'

export default function Create () {
  const [ photo, setPhoto ] = useState(null)
  const DEVICE_WIDTH = Dimensions.get('window').width
  const openPicker = () => {
    ImagePicker.openPicker({
      smartAlbums: ['Panoramas']
    })
    .then(image => {
      console.log('IAMGE', image);
      setPhoto(image)
    })
    .catch(console.warn)
  }

  return (
    <View style={styles.container}>
      {photo
        ? <Cropper image={photo} />
        : (
          <TouchableOpacity onPress={openPicker} style={{alignItems: 'center'}}>
            <Text style={styles.text}>IMPORT</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: Dimensions.get('window').width
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12
  }
})
