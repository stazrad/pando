import React, { useState } from 'react'
import { Animated, Dimensions, Image, ImageBackground, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PinchGestureHandler, State }  from 'react-native-gesture-handler'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import { updateProject } from 'LocalStorage'
import Body from 'components/Body'
import ButtonRow from './ButtonRow'
import InstagramAuth from './InstagramAuth'
import ImageCropper from './ImageCropper'
import { cropFramePromises, cropPromise, saveToCameraRoll } from './utils'
import PANDO_MUNCH from 'images/pando_munch.gif'

export default function Cropper (props) {
  const { image, onImagesReady, onPressBack } = props
  const [cropData, setCropData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingPercent, setLoadingPercent] = useState({})
  const [numOfFrames, setNumOfFrames] = useState(3)
  const [format, setFormat] = useState('best-fit')

  const onPressNext = async () => {
    setLoading(true)
    updateProject({ image })

    const hapticOpts = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    }
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOpts)

    const defaultLoadingPercent = {
      complete: 0,
      percentComplete: 0,
      total: numOfFrames
    }

    // set the text for the first pic before any promises resolve
    setLoadingPercent(defaultLoadingPercent)

    const croppedFullImage = await cropPromise(image, cropData)
    const cropPromises = cropFramePromises(croppedFullImage, numOfFrames, format)

    cropPromises.forEach((promise, i) => {
      const complete = i + 1
      const total = cropPromises.length
      const percentComplete = complete / total
      const loadingPercent = {
        complete,
        percentComplete,
        total
      }
      // loop through promises to add percentage
      promise.then(() => setLoadingPercent(loadingPercent))
    })

    return Promise.all(cropPromises)
      .then(([...uris]) => {
        onImagesReady(uris)
        setLoading(false)
      })
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
      {loading
        ? (
          <View style={styles.container}>
            <ImageBackground
              source={PANDO_MUNCH}
              style={{ height: 200, width: 200}} />
              <Text style={{ color: 'white' }}>
                {`Chopping photo ${loadingPercent.complete + 1} of ${loadingPercent.total}`}
              </Text>
            <ProgressViewIOS
              progress={loadingPercent.percentComplete}
              progressTintColor='pink'
              style={{ flex: 1, width: '80%', height: 400, position: 'absolute', bottom: 0 }} />
          </View>
        ):(
          <View style={styles.container}>
            {image &&
              <View style={styles.editorContainer}>

                <ImageCropper
                  image={image}
                  size={{ width: Dimensions.get('window').width - 20, height: 100 }}
                  onTransformDataChange={e => setCropData(e)}
                  style={styles.cropLinesRow} />
                {/*<ScrollView
                  style={styles.editor}
                  maximumZoomScale={.8}
                  minimumZoomScale={.2}
                  pinchGestureEnabledpersistentScrollbar
                  overScrollMode={true}
                  directionalLockEnabled
                  alwaysBounceVertical={true}
                  contentContainerStyle={styles.cropContainer}>
                  <Image
                    source={{ uri: image.path }}
                    style={{ ...styles.image, width: image.width, height: image.height }} />
                </ScrollView>*/}
                <View style={styles.cropLinesRow} pointerEvents='box-none' >
                  {framesArray.map((f, i) => (
                    <View
                      key={i}
                      style={styles.cropLines}
                      width={frameWidth}
                      pointerEvents='box-none' />
                  ))}
                </View>
              </View>
            }
            <ButtonRow
              format={format}
              numOfFrames={numOfFrames}
              onSetFormat={setFormat}
              onSetNumOfFrames={setNumOfFrames} />
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
          </View>
        )
      }
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
    paddingTop: 20,
  },
  cropContainer: {
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
    // width: '100%',
    // height: '100%',
  },
  editorContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 60,
    marginBottom: 40,
    padding: 10,
    paddingTop: 20,
  },
  image: {
    position: 'absolute',
  },
  textButtons: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'flex-start',
    fontFamily: 'Oswald-Regular',
  }
})
