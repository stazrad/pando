import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import POSTS from '../../data/POSTS.json'

export default function Feed () {
  return (
    <View style={styles.container}>
      {POSTS.map(post =>
        <View key={post.id}>
          <Text>{post.title}</Text>
          <Image
            source={{uri: post.image}}
            style={{width: 400, height: 200}} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
