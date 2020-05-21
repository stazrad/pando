import React, { useState } from 'react'
import { Animated, Dimensions, Image, ImageBackground, ProgressViewIOS, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { BlurView, VibrancyView } from '@react-native-community/blur'

import Body from 'components/Body'
import ButtonRow from './ButtonRow'
import InstagramAuth from './InstagramAuth'
import ImageCropper from './ImageCropper'
import Loading from './Loading'
import { cropFramePromises, cropPromise, saveToCameraRoll } from './utils'

const MAX_RATIO_LANDSCAPE = 1.8 // max allowed by instagram landscape best-fit
const MAX_RATIO_PORTRAIT = 0.8 // max allowed by instagram portrait best-fit

export default function Cropper (props) {
  const { onCancel, onImagesReady, persistCropState, project } = props
  const { cropState = {}, image } = project || {}
  const [numOfFrames, setNumOfFrames] = useState(cropState.numOfFrames || 3)
  const [format, setFormat] = useState(cropState.format || 'square')
  const [imageCropperState, setImageCropperState] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingPercent, setLoadingPercent] = useState({})
  const [containerSize, setContainerSize] = useState(null)

  const fullWidth = Dimensions.get('window').width - 20
  const getBestFit = (image, format, numOfFrames) => {
    const frameWidth = fullWidth / numOfFrames
    const dims = {
      height: frameWidth, // defaulted to square format
      width: frameWidth,
    }

    if (format === 'landscape') {
      dims.height = frameWidth / MAX_RATIO_LANDSCAPE
    } else if (format === 'portrait') {
      dims.height = frameWidth / MAX_RATIO_PORTRAIT
    }

    return dims
  }
  const frameDimensions = getBestFit(image, format, numOfFrames)

  const cancelCrop = () => {
    onCancel({ imageCropperState, format, numOfFrames })
  }
  const executeCrop = async () => {
    const defaultLoadingPercent = {
      complete: 0,
      percentComplete: 0,
      total: numOfFrames
    }

    // set the text for the first pic before any promises resolve
    setLoadingPercent(defaultLoadingPercent)
    // trigger loading state
    setLoading(true)

    // update project
    await persistCropState({ imageCropperState, format, numOfFrames })

    const croppedFullImage = await cropPromise(image, imageCropperState.cropData)
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
      promise.then(() => {
        const hapticOpts = {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false
        }

        ReactNativeHapticFeedback.trigger('impactMedium', hapticOpts)
        setLoadingPercent(loadingPercent)
      })
    })

    return Promise.all(cropPromises)
      .then(([...uris]) => {
        onImagesReady(uris)
        setLoading(false)
      })
  }

  const framesArray = []
  // setup array to render grid lines
  for (let i = 0; i < numOfFrames; i++) { framesArray.push(true) }

  return (
    <Body>
      <>
        <Loading loading={loading} loadingPercent={loadingPercent} />
        <View style={styles.container}>
          {image &&
            <View style={styles.editorContainer} onLayout={e => setContainerSize(e.nativeEvent.layout)}>
              {containerSize &&
                <>
                  <ImageCropper
                    image={image}
                    size={{ width: fullWidth, height: frameDimensions.height }}
                    imageCropperState={project?.cropState?.imageCropperState}
                    onTransformDataChange={e => setImageCropperState(e)} />
                  <View style={styles.cropLinesRow} pointerEvents='box-none'>
                    {framesArray.map((f, i) => (
                      <View
                        key={i}
                        style={[styles.cropLines, frameDimensions]}
                        pointerEvents='box-none' />
                    ))}
                  </View>
                </>
              }
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
              onPress={cancelCrop}>
              <Text style={styles.textButtons}>BACK</Text>
            </TouchableOpacity>
            <View style={{ flex: 2 }} />
            <TouchableOpacity
              style={{ alignSelf: 'stretch' }}
              onPress={executeCrop}>
              <Text style={styles.textButtons}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </Body>
  )
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})
