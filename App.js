import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Header from './src/components/Header'
import Feed from './src/components/Feed'
import Footer from './src/components/Footer'
import Main from './src/components/Main'

export default function App () {
  return (
    <View style={{ backgroundColor: '#b8dad5', flex: 1 }}>
      <Header />
      <Main>
        <Feed />
      </Main>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'grey'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
