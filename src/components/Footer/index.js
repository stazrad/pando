import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Footer () {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Footer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeb1b0',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100
  },
})
