import { ImageStore, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImageEditor from '@react-native-community/image-editor'

export const cropFramePromises = (image, numOfFrames, format = 'best-fit') => {
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
      setTimeout(() => {
        return ImageEditor.cropImage(image.path, cropData)
          .then(croppedImageUri => {
            resolve(croppedImageUri)
          })
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

export const saveToCameraRoll = croppedImageUri => {
  CameraRoll.saveToCameraRoll(croppedImageUri)
}
