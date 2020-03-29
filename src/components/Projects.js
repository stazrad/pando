import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList , Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Swipeable from 'react-native-swipeable-row'
import { navigate } from 'App'
import { deleteProject, fetchProjects } from 'LocalStorage'
const TMP_URL = 'https://legal.thomsonreuters.com/content/dam/ewp-m/images/legal/en/photography/photography/hero-medium-panoramic.png.transform/hero-m/q90/image.png'

export function ProjectPreview (props) {
  const { onSetImage, project, refreshProjects } = props
  const onPress = e => {
    onSetImage(project?.image)
    navigate('create')
  }
  const onDeleteProject = () => {
    console.log('SWIPE!')
    deleteProject(project)
    const hapticOpts = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    }
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOpts)
    refreshProjects()
  }
  const rightButtons = [
    <TouchableOpacity
      onPress={onDeleteProject}
      style={styles.delete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  ]
  console.log('preview', project?.image?.path)

  return (
    <Swipeable
      onRightActionRelease={onDeleteProject}
      rightButtons={rightButtons}
      style={styles.preview}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: project?.image?.path }}
          style={{ width: Dimensions.get('window').width, height: 100 }} />
      </TouchableOpacity>
    </Swipeable>
  )
}

export default function Projects (props) {
  const { onSetImage } = props
  const [projects, setProjects] = useState([])
  const refreshProjects = async () => {
    try {
      const projects = await fetchProjects()

      setProjects(projects)
    } catch (err) {
      console.log('Projects error', err)
    }
  }

  useEffect(() => {
    refreshProjects()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`My Pandos (${projects.length})`}</Text>
      <View>
        {
          !projects.length
            ? <Text style={styles.noProjectsText}>Import above to create your first pando!</Text>
            : (
              <FlatList
                data={projects}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ProjectPreview
                    project={item}
                    onSetImage={onSetImage}
                    refreshProjects={refreshProjects} />
                )}
              />
            )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'black',
  },
  delete: {
    backgroundColor: '#da3535',
    alignItems: 'center',
    width:  100,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'flex-start',
    fontFamily: 'Oswald-Regular',
  },
  noProjectsText: {
    color: 'white',
    marginTop: 20,
    fontFamily: 'Oswald-Light',
  },
  preview: {
    width: Dimensions.get('window').width,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: 'white',
    justifyContent: 'flex-start',
    fontFamily: 'Oswald-Regular',
  },
})
