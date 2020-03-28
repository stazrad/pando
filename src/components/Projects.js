import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList , Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { navigate } from 'App'
import { fetchProjects } from 'LocalStorage'

export function ProjectPreview (props) {
  const { onSetImage,project } = props
  const onPress = e => {
    onSetImage(project?.image)
    navigate('create')
  }

  return (
    <TouchableOpacity style={styles.preview} onPress={onPress}>
      <Image
        source={{ uri: project?.image?.path }}
        style={{ width: Dimensions.get('window').width, height: 100 }} />
    </TouchableOpacity>
  )
}

export default function Projects (props) {
  const { onSetImage } = props
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetcher = async () => {
      try {
        const projects = await fetchProjects()
        console.log('PROJECTS?', projects.length)

        setProjects(projects)
      } catch (err) {
        console.log('Projects error', err)
      }
    }

    fetcher()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pandos</Text>
      <View>
        {
          !projects.length
            ? <Text>Import above to create your first pando!</Text>
            : (
              <FlatList
                data={projects}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ProjectPreview project={item} onSetImage={onSetImage} />
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
  },
  preview: {
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
