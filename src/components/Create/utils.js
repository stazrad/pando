import ImageEditor from "@react-native-community/image-editor"

export const executeCrop = (image, numOfFrames, frameWidth) => {
  const cropData = {
    // offset: {x: number, y: number},
    size: {width: frameWidth, height: 100},
    displaySize: {width: frameWidth, height: 100},
    resizeMode: 'contain'
  }
  console.log('EXECUTION early', cropData, image)

  ImageEditor.cropImage(image.path, cropData)
  .then(img => {
    console.log('EXECUTION', img)
  })
  .catch(e => console.log('EXECUTION bad', e))
}
