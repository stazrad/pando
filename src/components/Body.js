import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function Body (props) {
  return (
    <SafeAreaView style={{...styles.container, ...props.style}}>
      {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
})
