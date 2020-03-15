import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { navigate } from 'App'
import Header from 'components/Header'
import Body from 'components/Body'

export default function Export (props) {
  console.log('export props', props)
  return (
    <>
      <Header style={{ backgroundColor: 'white' }} />
      <Body style={{ backgroundColor: 'white' }}>
        <View style={{...styles.container, ...props.style}}>
          <Text>export here</Text>
          <TouchableOpacity onPress={() => navigate('create')}>
            <Text>go back</Text>
          </TouchableOpacity>
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
})
