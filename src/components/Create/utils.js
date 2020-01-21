import { ImageEditor, ImageStore, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

export const executeCrop = (image, numOfFrames, frameWidth) => {
  const cropData = {
    // offset: {x: number, y: number},
    size: {width: 4000, height: 4000},
    displaySize: {width: 4000, height: 4000},
    resizeMode: 'contain'
  }
  console.log('EXECUTION early', ImageEditor.cropImage)
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

  ImageEditor.cropImage(image.path, cropData, success, failure)
}
