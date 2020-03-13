import React, { useState } from 'react'
import { FlatList } from 'react-native'

import Header from 'components/Header'
import Body from 'components/Body'
import FeedPost from './FeedPost'
import POSTS from '../../data/POSTS.json'

export default function Feed () {
  const [ refreshing, setRefreshing ] = useState(false)
  const onRefresh = () => {
    // TODO network call here
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <>
      <Header />
      <Body>
        <FlatList
          data={POSTS}
          keyExtractor={item => item.id}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <FeedPost post={item} />}
        />
      </Body>
    </>
  )
}
