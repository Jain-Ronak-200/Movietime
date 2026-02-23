import { ImageBackground,StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'


const _layout = () => {
  const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {

      return (
        <ImageBackground
          source={images.highlight}
          className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center items-center rounded-full overflow-hidden'
        >
          <ImageBackground
            source={icon}
            tintColor="#151312"
            className='size-5'
          />
          <Text className='text-secondary  text-base font-semibold ml-2'>{title}</Text>
        </ImageBackground>
      )
    }
    return (
      <View className='size-full justify-center items-center m-auto rounded-full'>
        <ImageBackground
          source={icon}
          className='size-5'
        />

      </View>
    )
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'yellow',
          padding: "auto"
        },
        tabBarStyle: {
          backgroundColor: '#0f0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23',

        }
      }}>

      <Tabs.Screen
        name="index"
        options={{
          headerShown: false, title: "Home",

          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={icons.home}
                title="Home" />
            </>
          )
        }}

      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false, title: "Search",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={icons.search}
                title="Search" />
            </>
          )
        }}

      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false, title: "Saved"
          ,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={icons.save}
                title="save" />
            </>
          )
        }}



      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false, title: "Profile"
          ,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={icons.person}
                title="Profile" />
            </>
          )
        }}

      />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})