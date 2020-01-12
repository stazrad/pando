import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

const DEFAULT_URL = 'https://s3.amazonaws.com/panoawards/wp-content/uploads/2016/10/Pano_Jesus-M-Garcia.jpg'

export default function Cropper (props) {
  const { url = DEFAULT_URL } = props
  const [ photos, setPhotos ] = useState([])
  const DEVICE_WIDTH = Dimensions.get('window').width

  return (
    <View style={styles.container}>
      <Text>Choose crop format:</Text>
      <View>
        <Button title='half'></Button>
        <Button title='thirds'></Button>
        <Button title='fourths'></Button>
      </View>
      <ImageBackground source={{ uri: DEFAULT_URL }} style={styles.cropContainer}>
        <View style={styles.cropLines} />
        <View style={styles.cropLines} />
        <View style={styles.cropLines} />
      </ImageBackground>
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
  cropContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap:'wrap',
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get('window').width
  },
  cropLines: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    height: 100,
    width: 100
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10
  }
})
