import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'

import { navigate } from 'App'
import { saveProject } from 'LocalStorage'
import Header from 'components/Header'
import Body from 'components/Body'
import Cropper from './Cropper'
import Import from 'components/Import'

export default function Create (props) {
  const { image, project = {} } = props
  const onImagesReady = images => navigate('export', { images })
  const saveDraft = async () => {
    const project = !!project?.image ? project : { image }

    await saveProject(project)
    navigate('import')
  }
  const onPressBack = () => {
    Alert.alert(
      '',
      'If you go back now, your image edits will be discarded.',
      [
        {text: 'Discard', onPress: () => navigate('import'), style: styles.discard},
        {text: 'Save ', onPress: saveDraft},
      ],
      { cancelable: true }
    )
  }

  return (
    <>
      <Body>
        <View style={styles.container}>
          <Cropper
            image={image}
            onImagesReady={onImagesReady}
            onPressBack={onPressBack} />
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
  discard: {
    color: 'red',
    backgroundColor: 'blue',
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
