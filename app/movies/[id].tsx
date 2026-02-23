import { Image, ScrollView, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails, getMovieTrailer } from '@/services/api'
import { icons } from '@/constants/icons'
import { savemovies } from '@/services/appwrite'
import { useAuth, useUser } from '@clerk/clerk-expo'
import TrailerPlayer from './TrailerPlayer'


interface MovieInfoProps{
  label:string,
  value?:string|number|null
}

const MovieInfo = ({label,value}:MovieInfoProps)=>(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}

    </Text>
    <Text className='text-light-100 font-bold text-sm'>
      {value||'N/A'}
    </Text>
     
  </View>
)



const MoviesDetails = () => {
  const{user}=useUser()
  const [save,setSave] = useState(0)
  // console.log("sdave dofhioewhf",save)
  const email = user?.primaryEmailAddress?.toString()
  
  useEffect(()=>{
    if (save!=0) {
      const response = savemovies(email,id)
      // console.log(response)
    }
  },[save])
  const[url,SetUrl]=useState<string | null>(null)

  const {id}=useLocalSearchParams()
  const{data:movie,loading}=useFetch(()=>fetchMovieDetails(id as string))


  const video = async(id:any)=>{

    if (id) {
      const stringId = id.toString();
     getMovieTrailer(stringId).then(url => {
  if (url) {
    console.log('Trailer URL:', url);
    SetUrl(url)
    
    
  }
});
      
    }

  }
  return (
    <View className='bg-primary flex-1'>
      <ScrollView 
      contentContainerStyle={{
        paddingBottom:80
      }}
      >
        <View>
          <View>
          {
            url?(
              <View className='flex pt-38 mt-20'>

              <TrailerPlayer url={url}/>
              </View>
            ):(
              <>

              <Image
              source={{uri:`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}}
              className='w-full h-[550px] rounded-b-3xl'
              resizeMode='stretch'
              />
          <TouchableOpacity
          onPress={()=>setSave(id)}
          
          >
          <View
          className='absolute flex-1 mt-9 bottom-6 mx-5 p-5 bg-primary/50 backdrop-blur-3xl rounded-3xl '
          >
            
            <Image
            source={icons.save}
            className=''
            />
          </View>
            </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>video(id)}
          
          >
          <View
          className='absolute flex-1 mt-9 bottom-6 mx-5 p-5 -right-1 bg-primary/50 backdrop-blur-3xl rounded-3xl '
          >
            
            <Image
            source={icons.play}
            className='size-7'
            />
          </View>
            </TouchableOpacity>
            </>
            )

          }
          </View>
          <View
          className='flex-col items-start justify-center mt-5 px-5'
          >
            <Text className='text-white font-bold text-xl'
            >
            {movie?.title}
            </Text>
            <View 
            className='flex-row items-center gap-x-1 mt-2'
            >
            <Text className='text-light-200'
            >
            {movie?.release_date?.split('-')[0]}
            </Text>
            <Text className='text-light-200 text-sm'
            >
            {movie?.runtime}m
            </Text>


            </View>
            <View
            className='flex-row items-center
             bg-dark-100 px-2 py-1  rounded-md gap-x-1 mt-2 '>
            <Image
            source={icons.star}
            />
            <Text className='text-white  font-bold'>
            {Math.round(movie?.vote_average??0)}/10
            </Text>
            <Text
            className='text-light-200 text-sm'>
            {movie?.vote_count} votes
            </Text>

            </View>
              <MovieInfo label="Overview"  value={movie?.overview} />
              <MovieInfo label="Genres"  value={movie?.genres?.map((g)=>g.name).join(' - ')||'N/A'} />
             
             <View
             className='flex flex-row justify-between w-1/2 '
             >
             <MovieInfo label="Budget"  value={`$${movie?.budget/1_000_000} million`} />
              <MovieInfo label="Revenue"  value={`$${Math.round(movie?.revenue)/1_000_000}`} />

             </View>

             <MovieInfo label="Production Companies"  value={movie?.production_companies?.map((g)=>g.name).join(' - ')||'N/A'} />


          </View>


        </View>




      </ScrollView>
      <TouchableOpacity
       className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 '
       onPress={router.back}
       >
        <Image 
        source={icons.arrow}
        className='size=5 mr-1 mt-0.5 rotate-180' tintColor={'#fff'}
        />
        <Text className='text-white font-semibold text-base '>
          Back to Movies
          </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MoviesDetails

const styles = StyleSheet.create({})