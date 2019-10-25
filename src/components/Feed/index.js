import React from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import POSTS from '../../data/POSTS.json'

export default function Feed () {
  const imageRenderer = ({ item }) => (
    <View key={item.id}>
      <Text>{item.title}</Text>
      <Image
        source={{uri: item.image}}
        style={{width: 400, height: 200}} />
    </View>
  )

  return (
    <FlatList
      data={POSTS}
      renderItem={imageRenderer}
      keyExtractor={item => item.id}
    />
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
