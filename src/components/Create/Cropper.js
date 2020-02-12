import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import InstagramAuth from './InstagramAuth'
import ImageEditorView from './Example'
import { executeCrop } from './utils'

const DEFAULT_URL = 'https://s3.amazonaws.com/panoawards/wp-content/uploads/2016/10/Pano_Jesus-M-Garcia.jpg'

export default function Cropper (props) {
  const { image } = props
  const [ numOfFrames, setNumOfFrames ] = useState(3)
  const [ format, setFormat ] = useState('best-fit')
  const DEVICE_WIDTH = Dimensions.get('window').width
  const getBestFit = (image, format, numOfFrames) => {
    if (format === 'square') {
      return 100
    } else if (format === 'best-fit') {
      const frameWidth = Dimensions.get('window').width / numOfFrames // TODO get View width

      return frameWidth
    }
  }
  const framesArray = []
  // setup array to render grid lines
  for (let i = 0; i < numOfFrames; i++) { framesArray.push(true) }

  const frameWidth = getBestFit(image, format, numOfFrames)

  return (
    <View style={styles.container}>
      {/*image &&
        <ScrollView>
          <Image source={{ uri: image.path }} style={styles.cropContainer} />
        </ScrollView>

        <ImageBackground source={{ uri: !!image ? image.path : DEFAULT_URL }} style={styles.cropContainer}>
          {framesArray.map((f, i) => (
            <View
              key={i}
              style={styles.cropLines}
              width={frameWidth} />
          ))}
        </ImageBackground>
      */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignSelf: 'stretch' }}
          onPress={() => {}}>
          <Text style={styles.textButtons}>BACK</Text>
        </TouchableOpacity>
        <View style={{ flex: 2 }} />
        <TouchableOpacity
          style={{ alignSelf: 'stretch' }}
          onPress={() => executeCrop(image, numOfFrames, format)}>
          <Text style={styles.textButtons}>NEXT</Text>
        </TouchableOpacity>
      </View>

      {image &&
        <View style={styles.editor}>
          <ImageEditorView
            image={image}
            style={styles.cropContainer} />
          <View style={styles.cropLinesRow}>
            {framesArray.map((f, i) => (
              <View
                key={i}
                style={styles.cropLines}
                width={frameWidth} />
            ))}
          </View>
        </View>
      }
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
          <Text style={styles.text}>{format}</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 600,
    width: Dimensions.get('window').width,
    margin: 5
  },
  cropContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  cropLines: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    height: '100%',
    width: 100
  },
  cropLinesRow: {
    flex: 1,
    flexDirection: 'row',
    height: 110,
    maxHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute'
  },
  editor: {
    flex: 8,
    // display: 'flex',
    alignItems: 'stretch',
    position: 'relative',
    backgroundColor: 'red'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 20,
    marginBottom: 50
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10
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
  },
  textButtons: {
    fontSize: 18,
    color: 'white',
    justifyContent: 'flex-start'
  }
})
