import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
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
  const [screen, setScreen] = useState('import')
  const [image, setImage] = useState(null)
  const [exportImages, setExportImages] = useState([])
  const screenSwitcher = screen => {
    switch(screen) {
      case 'create':
        return <Create image={image} />
      case 'export':
        return <Export images={exportImages} />
      case 'home':
        return <Feed />
      case 'import':
        return <Import onSetImage={setImage} />
      default:
        return <Feed />
      }
  }

  navigate = (screen, data = {}) => { // there's gotta be a better way to do this
    if (!!data.images) setExportImages(data.images)
    setScreen(screen)
  }

  return (
    <View style={styles.container}>
      {screenSwitcher(screen)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oswald-Bold',
  },
})
