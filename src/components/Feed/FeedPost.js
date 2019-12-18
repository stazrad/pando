import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'

export default function FeedPost (props) {
  const { post } = props
  const DEVICE_WIDTH = Dimensions.get('window').width

  return (
    <View style={styles.container} key={post.id}>
      <Image
        source={{uri: post.image}}
        style={{width: DEVICE_WIDTH, height: 120}} />
      <Text style={styles.title}>{post.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 140,
    marginVertical: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 4,
    marginHorizontal: 4,
  }
})
