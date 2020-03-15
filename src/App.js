import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import Body from 'components/Body'
import Create from 'components/Create'
import Export from 'components/Export'
import Feed from 'components/Feed'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Import from 'components/Import'

export let navigate = null // set inside App below

export default function App () {
  const screenSwitcher = (screen, data = {}) => {

    switch(screen) {
      case 'create':
        return <Create />
      case 'export':
        return <Export data={data} />
      case 'home':
        return <Feed />
      case 'import':
        return <Import />
      default:
        return <Feed />
      }
  }
  const [screen, onSetScreen] = useState('create')

  navigate = onSetScreen // there's gotta be a better way to do this
  // SplashScreen.hide()
  console.log('HIDE')

  return (
    <SafeAreaView style={styles.container}>
      {screenSwitcher(screen)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
