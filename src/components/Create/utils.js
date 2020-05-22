import { Image, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImageEditor from '@react-native-community/image-editor'
import ImageMarker from 'react-native-image-marker'

import PANDO from 'images/watermark.png'

export const cropFramePromises = (image, numOfFrames, format) => {
  const framePixelWidth = image.width / numOfFrames
  const promises = []

  for (let i = 0; i < numOfFrames; i++) {
    const xOffset = framePixelWidth * i // get offest of previous crop times width
    const cropData = {
      offset: {x: xOffset, y: 0},
      size: {width: framePixelWidth, height: image.height},
      displaySize: {width: framePixelWidth, height: image.height},
      resizeMode: 'cover'
    }

    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        return ImageEditor.cropImage(image.path, cropData)
          .then(croppedImageUri => {
            if (i !== numOfFrames - 1) {
              resolve(croppedImageUri)
            } else {
              // add the watermark to the last crop frame
              const lastImage = {
                height: image.height,
                path: croppedImageUri,
                width: framePixelWidth
              }

              return addWatermark(lastImage)
            }
          })
          .then(watermarkedImageUri => {
            resolve(watermarkedImageUri)
          })
          .catch(e => console.error('cropping ERROR:', e))
      }, i * 1500)
    })

    promises.push(promise)
  }

  return promises
}

export async function cropPromise (image, cropData) {
  try {
    const croppedImageURI = await ImageEditor.cropImage(image.path, cropData)

    return {
      ...cropData.size,
      path: croppedImageURI
    }
  } catch (cropError) {
    throw Error(cropError)
  }
}

export async function addWatermark (image) {
  const markerScale = (image.width / image.height) * .1
  const path = await ImageMarker.markImage({
      src: image.path,
      markerSrc: PANDO, // icon uri
      X: image.width - 240, // left
      Y: image.height - 50, // top
      scale: 1, // scale of bg
      markerScale: 0.1, // scale of icon
      quality: 100, // quality of image
      saveFormat: 'jpg',
  })
  const markedImage = Platform.OS === 'android' ? 'file://' + path : path

  return markedImage
}

export const saveToCameraRoll = croppedImageUri => {
  CameraRoll.saveToCameraRoll(croppedImageUri)
}
