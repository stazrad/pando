import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header () {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PANDO 🐼</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
  }
})
