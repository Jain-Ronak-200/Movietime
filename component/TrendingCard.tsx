import { StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

const TrendingCard = ({movie:{moive_id,title,poster_url},index}: TrendingCardProps) => {
  console.log('index',moive_id)
  return (
   
  <Link
   href={`/movies/${moive_id}`} asChild 
   >
    <TouchableOpacity
    className='w-32 relative pl-5'
    >
    <Image source={{uri:poster_url}}
    className='w-32 h-48 rounded-lg'
    resizeMode='cover'
     />
     <View
     className='absolute bottom-2 -left-2.5 gap-1 px-2 py-1 rounded-full'
     >
      <MaskedView maskElement={
        <Text className='font-bold text-6xl'>{index + 1}</Text>
      }>
        <Image
        source={images.rankingGradient}
        className='size-14'
        resizeMode='cover'
        />
      </MaskedView>
      </View> 
      <Text
      className='text-sm font-bold mt-2 text-light-200'
      numberOfLines={2}
      >{title}
      </Text>

    </TouchableOpacity>
  </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})