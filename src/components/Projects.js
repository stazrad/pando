import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList , Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Swipeable from 'react-native-swipeable-row'
import { navigate } from 'App'
import { deleteProject, fetchProjects } from 'LocalStorage'

export function ProjectPreview (props) {
  const { project, refreshProjects } = props
  const openProject = e => {
    navigate('create', { project })
  }
  const onDeleteProject = async () => {
    const hapticOpts = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    }

    ReactNativeHapticFeedback.trigger('impactMedium', hapticOpts)
    await deleteProject(project)
    refreshProjects()
  }
  const rightButtons = [
    <TouchableOpacity
      onPress={onDeleteProject}
      style={styles.delete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  ]

  return (
    <Swipeable
      onRightSwipe={onDeleteProject}
      rightButtons={rightButtons}
      rightButtonWidth={200}
      // bounceOnMount
      style={styles.preview}>
      <TouchableOpacity onPress={openProject} style={styles.image}>
        <Image
          source={{ uri: project?.image?.path }}
          style={styles.image} />
      </TouchableOpacity>
    </Swipeable>
  )
}

export default function Projects (props) {
  const [projects, setProjects] = useState([])
  const refreshProjects = async () => {
    try {
      const projects = await fetchProjects()

      props.expandProjects(projects.length > 4)
      setProjects(projects)
    } catch (err) {
      console.log('Projects error', err)
    }
  }
  const onScroll = e => {
    // const { y } = e.nativeEvent.contentOffset
    //
    // props.expandProjects(y > 100)
  }

  useEffect(() => {
    refreshProjects()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pandos
        <Text style={{ fontSize: 18 }}>{` (${projects.length})`}</Text>
      </Text>
      <View style={styles.scrollContainer}>
        {
          !projects.length
            ? <Text style={styles.noProjectsText}>Import above to create a Pando!</Text>
            : (
              <FlatList
                data={projects}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ProjectPreview
                    project={item}
                    refreshProjects={refreshProjects} />
                )}
              />
            )
        }
      </View>

      <Text style={styles.subtitle}>version 1.1.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  delete: {
    backgroundColor: '#da3535',
    alignItems: 'center',
    justifyContent: 'center',
    width:  200,
    height: 100,
  },
  deleteText: {
    color: 'white',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oswald-Regular',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 100,
  },
  noProjectsText: {
    color: 'white',
    marginTop: 28,
    fontSize: 18,
    fontFamily: 'Oswald-Light',
  },
  preview: {
    width: Dimensions.get('window').width,
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    marginBottom: 8,
    color: 'white',
    justifyContent: 'flex-start',
    fontFamily: 'Oswald-Regular',
  },
  scrollContainer: {
    flex: 1,
  },
  subtitle: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Oswald-Light',
    maxHeight: 20,
  }
})
