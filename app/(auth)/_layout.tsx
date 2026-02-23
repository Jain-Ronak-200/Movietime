import { Stack } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
// import { ClerkProvider } from '@clerk/clerk-expo'
// import { tokenCache } from '@clerk/clerk-expo/token-cache'

// import './global.css'
export default function RootLayout() {

  return (
    <>
       {/* <ClerkProvider tokenCache={tokenCache}> */}

      
      <Stack>
      <StatusBar
      hidden={true}
      // barStyle={"light-content"}
      />
     
        {/* <Stack.Screen
        name="(auth)" 
        options={{ headerShown: false }} 
        /> */}

  
        <Stack.Screen 
        name="login" 
        options={{ headerShown: false }} 
        />
        
      </Stack>
        {/* </ClerkProvider> */}
    </>
  )
}
