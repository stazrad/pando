import React, { useEffect, useState } from 'react'
import { Button, Dimensions, ImageBackground, StyleSheet, Switch, Text, View } from 'react-native'
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
      <Text>Choose crop format:</Text>
      <View>
        <Button title='halve' onPress={() => setNumOfFrames(2)}></Button>
        <Button title='thirds' onPress={() => setNumOfFrames(3)}></Button>
        <Button title='fourths' onPress={() => setNumOfFrames(4)}></Button>
      </View>
      <View>
        <Button title='square' onPress={() => setFormat('square')}></Button>
        <Button title='best-fit' onPress={() => setFormat('best-fit')}></Button>
      </View>
      {image &&
        <ImageEditorView
          image={image} />
      }
      {/*<ImageBackground source={{ uri: !!image ? image.path : DEFAULT_URL }} style={styles.cropContainer}>
        {framesArray.map((f, i) => (
          <View
            key={i}
            style={styles.cropLines}
            width={frameWidth} />
        ))}
      </ImageBackground>
      <InstagramAuth />*/}
      <Button title='Export' onPress={() => executeCrop(image, numOfFrames, format)}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 600,
    width: Dimensions.get('window').width
  },
  cropContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap:'wrap',
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get('window').width
  },
  cropLines: {
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dashed',
    height: 100,
    width: 100
  },
  pano: {
    height: 100,
    width: Dimensions.get('window').width,
    marginBottom: 10
  }
})
