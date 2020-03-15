import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'

import { navigate } from 'App'
import { saveToCameraRoll } from 'components/Create/utils'
import Header from 'components/Header'
import Body from 'components/Body'

export default function Export (props) {
  const { images } = props
  const onSaveToCameraRoll = images => {
    images.forEach(image => saveToCameraRoll(image))
  }

  return (
    <>
      <Header style={{ backgroundColor: 'white' }} />
      <Body style={{ backgroundColor: 'white' }}>
        <View style={{...styles.container, ...props.style}}>
          <View style={styles.sliderContainer}>
            <SliderBox
              images={images}
              sliderBoxHeight={280}
              dotColor='pink'
              inactiveDotColor='grey'
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 0,
                marginHorizontal: -20,
              }} />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonBig}
              onPress={() => onSaveToCameraRoll(images)}>
              <Text style={styles.buttonBigText}>SAVE TO CAMERAROLL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('create')}>
              <Text style={styles.buttonText}>BACK TO EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonBig: {
    backgroundColor: 'black',
    height: 80,
    width: '100%',
  },
  buttonBigText: {
    color: 'white',
    padding: 28,
    alignSelf: 'center'
  },
  buttonsContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
  },
  sliderContainer: {
    flex: 1,
    marginTop: 60,
    height: 340,
  },
})
