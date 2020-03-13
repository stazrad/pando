import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import ReactNativeHapticFeedback from "react-native-haptic-feedback"

export default function ButtonRow (props) {
  const { format, numOfFrames, onSetFormat, onSetNumOfFrames } = props
  const hapticOpts = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  }
  const setFormat = format => {
    // ReactNativeHapticFeedback.trigger('impactLight', true)
    onSetFormat(format)
  }
  const setNumOfFrames = numOfFrames => {
    // ReactNativeHapticFeedback.trigger('impactLight', hapticOpts)
    onSetNumOfFrames(numOfFrames)
  }

  return (
    <View style={styles.buttonRow}>
      {[2,3,4,5].map(i => {
        const selected = numOfFrames === i ? styles.selected : {}
        return (
          <TouchableOpacity
            key={i}
            onPress={() => setNumOfFrames(i)}
            style={{ ...styles.button, ...selected }}>
            <Text style={styles.text}>{i}</Text>
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity
        style={{ ...styles.button, marginLeft: 12 }}
        onPress={() => setFormat(format === 'square' ? 'best-fit' : 'square')}>
        <Text style={styles.text}>{format === 'square' ? '1:1' : 'best-fit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: 80,
    height: 80,
    maxWidth: 80,
    maxHeight: 80,
    backgroundColor: 'white',
    color: 'black',
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRow: {
    flex: 2,
    flexDirection: 'row',
    height: 110,
    maxHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  selected: {
    height: 92,
    maxHeight: 92,
    margin: 2
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black'
  }
})
