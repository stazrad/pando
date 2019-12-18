import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function Body (props) {
  return (
    <SafeAreaView style={styles.container}>
      {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
