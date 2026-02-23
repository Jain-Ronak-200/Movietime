import { Stack } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

import './global.css'
export default function RootLayout() {

  return (
    <>
       <ClerkProvider tokenCache={tokenCache}>

      <StatusBar
      hidden={false}
      // barStyle={"light-content"}
      />
     
      
      <Stack>
        <Stack.Screen
        name="(tabs)" 
        options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="(auth)" 
        options={{ headerShown: false }} 
        />

        <Stack.Screen 
        name="movies/[id]" 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="(auth)/login" 
        options={{ headerShown: false }} 
        />
        
      </Stack>
        </ClerkProvider>
    </>
  )
}
