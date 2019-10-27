import React, { useState } from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import FeedPost from './FeedPost'
import POSTS from '../../data/POSTS.json'

export default function Feed () {
  const [ refreshing, setRefreshing ] = useState(false)
  const postRenderer = ({ item }) => (
    <FeedPost post={item} />
  )
  const onRefresh = () => {
    // TODO network call here
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <FlatList
      data={POSTS}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={postRenderer}
    />
  )
}
