import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ToastManager, { Toast } from 'toastify-react-native'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false
        }}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})