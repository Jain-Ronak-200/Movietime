import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '@/component/SearchBar'
import { images } from '@/constants/images'
import MoiveCard from '@/component/MoiveCard'
import { fetchPopularMoives } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import { udateSearchCount } from '@/services/appwrite'


const search = () => {
  const movieGenres = {
    types: ["Comedy", "Drama", "Action", "Adventure", "Horror", "Thriller", "Sci-Fi", "Fantasy", "Romance", "Mystery", "Animation", "Documentary"]
  };
  const [searchQuery,setSearchQury]=useState('')
  const { data: movies, loading: moviesLoading, error: movieserror,refetch:loadMovies,reset} = useFetch(() => fetchPopularMoives({ query: searchQuery }),false)
  useEffect(()=>{

    
    const timeoutid = setTimeout( async ()=>{
      if(searchQuery.trim()){
        await loadMovies();
       
      }
      else{
        reset();
      }
      
    },500);
    return()=> clearTimeout(timeoutid)
  },[searchQuery])


  useEffect(() => {
    const updateSearchCount = async () => {
      if (movies?.length > 0 && movies?.[0]) {
        await udateSearchCount(searchQuery, movies[0]);
      }
    };
    updateSearchCount();
  }, [movies]);

  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList data={movies} renderItem={({ item }) => <MoiveCard  {...item} />
      } keyExtractor={(item => item.id.toString)} className='px-5'
        columnWrapperStyle={
          {
            justifyContent: 'center',
            gap: 20,
            marginVertical: 16
          }
        }
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 100 }}
        
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center '>
              <Image source={icons.logo} className='w-12 h-10' resizeMode='cover' />

            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search movies...'
              value={searchQuery}
              onChangeText={(text:string) => setSearchQury(text)}
              />
              <FlatList
              data={movieGenres.types}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity  onPress={()=>setSearchQury(item)} >

                <View  className='pl-7 pr-7 pt-3 pb-2 mt-3 rounded-full backdrop:blur-xl bg-white/30 mx-2'>
                <Text className='text-white'>{item}</Text>
                </View>
                </TouchableOpacity>
              )}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3' />
            )}
            {movieserror && (
              <Text className='text-red-500  px-5 my-3 text-lg'>Error{movieserror?.message}</Text>
            )}

            {
              !moviesLoading &&
                !movieserror &&
                searchQuery.trim() &&
                movies && movies.length > 0 &&(
                <Text className="text-white text-xl gap-1 font-bold mt-5 mb-3">
                  Results for Search Term  <Text className='text-accent '>
                  " {searchQuery} "
                  </Text>
                  
                </Text>
              ) 
            }

          </>
        } 
        ListEmptyComponent={
          !moviesLoading && !movieserror?(
            <View className='mt-10 px-5 items-center justify-center'>

            <Text className='text-center text-gray-500'>
             {searchQuery.trim()?'No results found':'Search for movies'}
            </Text>
            </View>
          ):null
        }/>


    </View>
  )
}

export default search

const styles = StyleSheet.create({})