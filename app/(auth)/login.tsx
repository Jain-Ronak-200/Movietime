import { Image, StyleSheet, Text, View,TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { WebView } from 'react-native-webview';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useSSO } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
// import { images } from "@/constants/images";

const login = () => {

      const { startSSOFlow } = useSSO()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      })
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId })
        router.replace('../(tabs)')
      }
    } catch (error) {
      console.error('OAuth error:', error)
    }
  }



    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateY]);

    return (
      <>

        <View
            className='flex flex-1 flex-col gap-5 items-center justify-center bg-primary '
            >
                <StatusBar
                    translucent 
                    backgroundColor="transparent"
                    barStyle="dark-content" />
              
               <Image
                              source={images.bg}
                              className="absolute w-full z-0" />
            
          

            <Animated.Image
            source={images.Popcorns}
            resizeMode="contain"
            style={{ transform: [{ translateY }] }}
            />
            <Text
            className='text-3xl text-white font-bold mt-15'
            >
            Welcome to MovieTime
            </Text>
            <Text
                        className='text-sm text-gray-500 font-semibold mt-15'

            >
            Sign-in With Google 
            </Text>
            <TouchableOpacity
            className="flex flex-row items-center justify-between px-9 py-3 mt-15 bg-white rounded-3xl shadow-md"
            onPress={handleGoogleSignIn}
            >
            <Image
                source={images.google}
                className="w-6 h-6 mr-2"
            />
            <Text className="text-black text-lg font-medium">Continue with Google</Text>
            </TouchableOpacity>
        </View>
                </>
    );
};

export default login;



