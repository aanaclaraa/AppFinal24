import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Perfil() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Perfil</Text>
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
})