import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import Body from './components/Body'
import Create from './components/Create'
import Feed from './components/Feed'
import Footer from './components/Footer'
import Header from './components/Header'

export let navigate = null // set inside App below

export default function App () {
  const screenSwitcher = screen => {

    switch(screen) {
      case 'create':
        return <Create />
      case 'home':
        return <Feed />
      default:
        return <Feed />
      }
  }
  const [ screen, onSetScreen ] = useState('create')

  navigate = onSetScreen // there's gotta be a better way to do this
  SplashScreen.hide()
  console.log('HIDE')

  return (
    <View style={{ backgroundColor: '#4d4d4d', flex: 1 }}>
      <Header />
      <Body>
        {screenSwitcher(screen)}
      </Body>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#4d4d4d'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
