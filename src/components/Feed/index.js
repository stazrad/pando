import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import POSTS from '../../data/POSTS.json'

export default function Feed () {
  const DEVICE_WIDTH = Dimensions.get('window').width
  const imageRenderer = ({ item }) => (
    <View style={styles.post} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={{uri: item.image}}
        style={{width: DEVICE_WIDTH, height: 200}} />
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
  post: {
    backgroundColor: 'white',
    height: 260,
    marginVertical: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 4,
    marginHorizontal: 4,
  }
})
