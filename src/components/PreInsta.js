import React from 'react'
import { Dimensions, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SvgUri from 'react-native-svg-uri'

import Body from 'components/Body'
import INSTAGRAM from 'images/icon_instagram.png'
import FEED from 'images/icon_instagram_feed.png'
import MULTI from 'images/icon_instagram_multi.png'
import EXPAND from 'images/icon_instagram_expand.png'

export default function PreInsta (props) {
  const { images, onCancel, onSaveToCameraRoll, savedToCameraRoll, show, showExpand } = props
  const saveToCameraRoll = async () => {
    // close this modal before moving over to insta
    onCancel()
    // only store images if necessary
    if (!savedToCameraRoll) await onSaveToCameraRoll([...images].reverse())
    Linking.openURL(`instagram://library?AssetPath=${images[0]}`)
  }

  return (
    <SafeAreaView style={{ ...styles.container, zIndex: show ? 99 : 0 }}>
      <Body style={styles.body}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image
              source={INSTAGRAM} />
          </View>
          <Text style={styles.text}>Pando! will save to your camera roll and send you to Instagram</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image
              source={FEED} />
          </View>
          <Text style={styles.text}>Tap "Feed" to create a new post</Text>
        </View>
        {showExpand &&
          <View style={styles.row}>
            <View style={styles.icon}>
              <Image
                source={EXPAND} />
            </View>
            <Text style={styles.text}>Since your crops are not 1:1, be sure to tap this button to line up your slices</Text>
          </View>
        }
        <View style={styles.row}>
          <View style={styles.icon}>
            <Image
              source={MULTI} />
          </View>
          <Text style={styles.text}>Choose "Multi Post" to make a slider of your Pando!</Text>
        </View>
        <View style={[styles.row, { maxHeight: 80, alignItems: 'baseline' }]}>
          <Text style={[styles.text, { textAlign: 'center' }]}>🐼 Tag @pando_app</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonBig}
          onPress={saveToCameraRoll}>
          <Text style={styles.buttonBigText}>OPEN INSTAGRAM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.buttonBig, backgroundColor: 'white'}}
          onPress={onCancel}>
          <Text style={{...styles.buttonBigText, color: 'black', fontFamily: 'Oswald-Regular'}}>BACK</Text>
        </TouchableOpacity>
      </Body>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    width: '80%',
    marginTop: 120,
    backgroundColor: 'white'
  },
  buttonBig: {
    backgroundColor: 'black',
    height: 60,
    width: 240,
    marginBottom: 8,
  },
  buttonBigText: {
    color: 'white',
    padding: 16,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Oswald-Bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    height: 8,
    width: 8,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    flex: 3,
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Oswald-Regular',
  },
})
