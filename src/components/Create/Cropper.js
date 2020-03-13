import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import Body from 'components/Body'
import ButtonRow from './ButtonRow'
import InstagramAuth from './InstagramAuth'
import ImageEditorView from './Example'
import { executeCrop } from './utils'

const DEFAULT_URL = 'https://s3.amazonaws.com/panoawards/wp-content/uploads/2016/10/Pano_Jesus-M-Garcia.jpg'

export default function Cropper (props) {
  const { image, onImagesReady, onPressBack } = props
  const [ numOfFrames, setNumOfFrames ] = useState(3)
  const [ format, setFormat ] = useState('best-fit')

  const onPressNext = async () => {
    const images = await executeCrop(image, numOfFrames, format)

    console.log('IMAGES??', images)
    onImagesReady(images)
  }
  const getBestFit = (image, format, numOfFrames) => {
    if (format === 'square') {
      return 100
    } else if (format === 'best-fit') {
      const frameWidth = (Dimensions.get('window').width - 20) / numOfFrames // TODO get View width

      return frameWidth
    }
  }
  const framesArray = []
  // setup array to render grid lines
  for (let i = 0; i < numOfFrames; i++) { framesArray.push(true) }

  const frameWidth = getBestFit(image, format, numOfFrames)

  return (
    <Body>
      <View style={styles.container}>
        {/*image &&
          <ScrollView>
            <Image source={{ uri: image.path }} style={styles.cropContainer} />
          </ScrollView>

          // <ImageBackground source={{ uri: !!image ? image.path : DEFAULT_URL }} style={styles.cropContainer}>
          //   {framesArray.map((f, i) => (
          //     <View
          //       key={i}
          //       style={styles.cropLines}
          //       width={frameWidth} />
          //   ))}
          // </ImageBackground>
        */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ alignSelf: 'stretch' }}
            onPress={onPressBack}>
            <Text style={styles.textButtons}>BACK</Text>
          </TouchableOpacity>
          <View style={{ flex: 2 }} />
          <TouchableOpacity
            style={{ alignSelf: 'stretch' }}
            onPress={onPressNext}>
            <Text style={styles.textButtons}>NEXT</Text>
          </TouchableOpacity>
        </View>

        {image &&
          <View style={styles.editorContainer}>
            <View style={styles.editor}>
              <View
                image={image}
                style={styles.cropContainer}>
                <Image source={image} />
              </View>
              <View style={styles.cropLinesRow}>
                {framesArray.map((f, i) => (
                  <View
                    key={i}
                    style={styles.cropLines}
                    width={frameWidth} />
                ))}
              </View>
            </View>
          </View>
        }
        <ButtonRow
          format={format}
          numOfFrames={numOfFrames}
          onSetFormat={setFormat}
          onSetNumOfFrames={setNumOfFrames} />
      </View>
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
    paddingTop: 20,
  },
  cropContainer: {
    height: '100%',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cropLines: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 100,
    width: 100
  },
  cropLinesRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  editor: {
    flex: 4,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute'
  },
  editorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 40,
    marginBottom: 40,
    paddingTop: 20,
  },
  textButtons: {
    fontSize: 18,
    color: 'white',
    justifyContent: 'flex-start'
  }
})
