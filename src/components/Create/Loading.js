import React from 'react'
import { ImageBackground, ProgressViewIOS, StyleSheet, Text, View } from 'react-native'
import PANDO_LOADING from 'images/pando_loading.gif'

export default function Loading (props) {
  const { loading, loadingPercent } = props

  return (
    <View style={{ ...styles.container, zIndex: loading ? 99 : 0 }}>
      <ImageBackground
        source={PANDO_LOADING}
        style={{ height: 200, width: 200 }} />
        <Text style={{ color: 'white', fontFamily: 'Oswald-Regular', fontSize: 16 }}>
          {`Chopping photo ${loadingPercent.complete + 1} of ${loadingPercent.total}`}
        </Text>
      <ProgressViewIOS
        progress={loadingPercent.percentComplete}
        progressTintColor='white'
        trackTintColor='#212121'
        style={styles.progressBar} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
  },
  progressBar: {
    transform: [{ scaleX: 1.0 }, { scaleY: 4 }],
    flex: 1,
    width: '80%',
    height: 400,
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
  }
})
