import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

export default function Footer () {
  const [ photos, setPhotos ] = useState([])
  const DEVICE_WIDTH = Dimensions.get('window').width

  useEffect(() => {
    if (!photos.length) {
      CameraRoll.getPhotos({
        first: 5,
        assetType: 'Photos'
      })
      .then(res => {
        console.log('PHOTOS', res.edges)
        setPhotos(res.edges)
      })
      .catch(e => console.log('GET PHOTOS ERROR', e))
    }
  })

  return (
    <View style={styles.container}>
      <Text>Select a pano:</Text>
      <ScrollView>
        {photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={styles.pano}
              source={{ uri: p.node.image.uri }}
              onStartShouldSetResponder={() => true}
              onResponderGrant={() => alert(p.node.image.filename)}
            />
          )
        })}
      </ScrollView>
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
