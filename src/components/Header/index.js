import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header () {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pando 🐼</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
