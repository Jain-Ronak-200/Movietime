import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
interface props {
  value?:string;
  placeholder:string;
  onPress?: () => void;
  onChangeText?:(text:string)=>void;
}
const SearchBar = ({placeholder,onPress,value,onChangeText}:props) => {

  return (
    <View className='flex-row items-center  bg-dark-200 text-white rounded-full px-5 py-4'>
        <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"/>
        <TextInput
            className='flex-1 text-white px-5'
            
            onPress={onPress}

            value={value}
            editable={true}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#a8b5db" />
    </View>
  )
}

export default SearchBar

