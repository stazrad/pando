import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'

import { navigate } from 'App'
import { deleteProject, updateProject } from 'LocalStorage'
import Header from 'components/Header'
import Body from 'components/Body'
import Cropper from './Cropper'
import Import from 'components/Import'

export default function Create (props) {
  const { isNewImport, project } = props
  const onImagesReady = images => navigate('export', { images })
  const saveDraft = async () => {
    const updatedProject = await updateProject(project)

    navigate('import', { project: updatedProject })
  }
  const deleteDraft = async () => {
    // only delete new imports; leave existing projects
    if (project.draft) await deleteProject(project)
    navigate('import', { project: null })
  }
  const onPressBack = () => {
    Alert.alert(
      '',
      'If you go back now, your image edits will be discarded.',
      [
        {text: 'Discard', onPress: deleteDraft, style: styles.discard},
        {text: 'Save ', onPress: saveDraft},
      ],
      { cancelable: true }
    )
  }
  console.log('Create index.js project', project)

  return (
    <>
      <Body>
        <View style={styles.container}>
          <Cropper
            image={project?.image}
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
