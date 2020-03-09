import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function App () {
  return (
    <View style={{ backgroundColor: '#4d4d4d', flex: 1 }}>
      this is some text, yo
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#4d4d4d'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
