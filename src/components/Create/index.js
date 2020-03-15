import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { navigate } from 'App'
import Header from 'components/Header'
import Body from 'components/Body'
import Cropper from './Cropper'
import Import from 'components/Import'

export default function Create () {
  const [photo, setPhoto] = useState(null)
  const onImagesReady = images => navigate('export', { images })

  return (
    <>
      <Body>
        <View style={styles.container}>
          {photo
            ? <Cropper image={photo} onImagesReady={onImagesReady} onPressBack={() => setPhoto(null)} />
            : <Import onSetPhoto={setPhoto} />
          }
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
