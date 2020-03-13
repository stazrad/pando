import { ImageStore, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImageEditor from '@react-native-community/image-editor'

export const executeCrop = (image, numOfFrames, format = 'best-fit') => {
  const promises = []

  let framePixelWidth
  if (format === 'best-fit') {
    // best-fit workflow:
    framePixelWidth = image.width / numOfFrames
  } else if (format === 'square') {
    // square workflow
    framePixelWidth = image.height / numOfFrames
  }

  console.log('framePixelWidth', image, framePixelWidth)

  for (let i = 0; i < numOfFrames; i++) {
    const xOffset = framePixelWidth * i // get offest of previous crop times width
    const cropData = {
      offset: {x: xOffset, y: 0},
      size: {width: framePixelWidth, height: image.height},
      displaySize: {width: framePixelWidth, height: image.height},
      resizeMode: 'cover'
    }
    console.log('for loop cover', numOfFrames, i, cropData)

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('PRINT')
        const success = croppedImageUri => {
          console.log('croppedImageUri = ', croppedImageUri)
          if (Platform.OS === 'ios') {
            ImageStore.getBase64ForTag(
              croppedImageUri,
              (base64Image) => {
                // send image to server or save it locally
                ImageStore.removeImageForTag(croppedImageUri)
                // this will be a problem for android
                resolve(base64Image)
              },
              (err) => {
                console.log('success error', err)
              }
            )
          }
        }

        ImageEditor.cropImage(image.path, cropData, success, reject)
      }, i * 3000)
    })

    promises.push(promise)
  }

  return Promise.all(promises)
    .then((...crops) => {
      return [...crops]
    })
    .catch(err => console.error('crop failure', err))
}

export const saveToCameraRoll = croppedImageUri => {
  CameraRoll.saveToCameraRoll(croppedImageUri)
}
