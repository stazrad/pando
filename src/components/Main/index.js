import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function Main (props) {
  return (
    <SafeAreaView style={styles.container}>
      {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#cecece',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
