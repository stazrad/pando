import { ImageEditor, ImageStore, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

export const executeCrop = (image, numOfFrames, frameWidth) => {
  const success = (croppedImageUri) => {
    console.log('croppedImageUri = ', croppedImageUri)
    CameraRoll.saveToCameraRoll(croppedImageUri)

    if (Platform.OS === 'ios') {
      ImageStore.getBase64ForTag(
        croppedImageUri,
        (base64Image) => {
          // send image to server or save it locally
          ImageStore.removeImageForTag(croppedImageUri)
        },
        (err) => {
          console.log('success error', err)
        }
      )
    }
  }
  const failure = image => console.log('failure', image)

  // best-fit workflow:
  const framePixelWidth = image.width / numOfFrames

  for (let i = 0; i < numOfFrames; i++) {
    const xOffset = (framePixelWidth * i) + 10 // get offest of previous crop times width
    const cropData = {
      offset: {x: xOffset, y: 0},
      size: {width: framePixelWidth, height: image.height},
      displaySize: {width: framePixelWidth, height: image.height},
      resizeMode: 'cover'
    }
    console.log('for loop cover', numOfFrames, i, cropData)

    setTimeout(() => {
      console.log('PRINT')
      ImageEditor.cropImage(image.path, cropData, success, failure)
    }, i * 3000)
  }
}
