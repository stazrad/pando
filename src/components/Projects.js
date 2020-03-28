import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { fetchProjects } from 'LocalStorage'

export default function Projects (props) {
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
    <View>
      <Text style={styles.title}>Projects</Text>
      <View>
        {
          !projects.length
            ? null
            : (
              projects.map(project => (
                <View>
                  <Image
                    source={{ uri: project?.image?.path }}
                    style={{ width: Dimensions.get('window').width, height: 100 }} />
                </View>
              ))
            )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'flex-start',
    fontFamily: 'Oswald-Regular',
  },
})
