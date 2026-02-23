// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { getSavedMovies } from '@/services/appwrite'
// import { useUser } from '@clerk/clerk-expo'

// const saved = () => {
//   const{user}=useUser()
//   const email = user?.primaryEmailAddress
//   const [datas, setDatas] = useState<any[]>([])
//   useEffect(()=>{
//       getSavedMovies(email).then(response => {
//         if (response) {
//           // datas.push(response.SaveId)
//             setDatas([response.SaveId])
//           console.log(response.SaveId,"fsdfsdaf",datas);
//         }
//       }).catch(error => {
        
//         console.error('Error fetching saved movies:', error);
//       });
//       console.log("hello ggs",datas)
//   },[])
//   return (
//     <View
//     className='bg-primary flex-1'
//   >
//     <Text className="text-4xl text-accent">Saved !</Text>
     
//   </View>
//   )
// }

// export default saved

// const styles = StyleSheet.create({})
// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { getSavedMovies } from '@/services/appwrite'
// import { useUser } from '@clerk/clerk-expo'

// const Saved = () => {
//   const { user } = useUser()
//   const email = user?.primaryEmailAddress
//   const [datas, setDatas] = useState<any[]>([])

//   useEffect(() => {
//     if (!email) return;

//     getSavedMovies(email)
//       .then(response => {
//         if (response) {
//           setDatas([response.SaveId]) // or spread if more
//           console.log('Inside then:', response.SaveId)
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching saved movies:', error)
//       })
//   }, [email])

//   useEffect(() => {
//     console.log("Outside, after update:", datas)
//   }, [datas])
//   console

//   return (
//     <View className='bg-primary flex-1'>
//       <Text className="text-4xl text-accent">Saved!</Text>
//     </View>
//   )
// }

// export default Saved

// const styles = StyleSheet.create({})

// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { getSavedMovies } from '@/services/appwrite'
// import { useUser } from '@clerk/clerk-expo'
// import { fetchMovieDetails } from '@/services/api'
//  const TMDB_CONFIG = {
//     BASE_URL: 'https://api.themoviedb.org/3',
//     API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
//     headers:{
//         accepet: 'application/json',
//         Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
//     }
// }
// const Saved = () => {
//   const { user } = useUser()
//   const email = user?.primaryEmailAddress
//   const [datas, setDatas] = useState<any[]>([])

//   useEffect(() => {
//     if (!email) return;

//     getSavedMovies(email)
//       .then(response => {
//         if (response) {
//           // Assuming response.SaveId is an array
//           setDatas(response.SaveId) 
//           console.log('Fetched SaveIds:', response.SaveId)
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching saved movies:', error)
//       })
//   }, [email])
//   datas.map(async(item)=>{
//     let movieId=String(item)
//     console
//     try {
//             const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
//                 method: 'GET',
//                 headers: TMDB_CONFIG.headers,
//             })
//             if (response.ok) {
//                 throw new Error('Failed to fetch movie details')        
//             }
//             const data = await response.json()
//             return data
            
//         } catch (error) {
//             console.error('Error fetching movie details:', error)
//             throw error
//         }
    
//   })

//   return (
//     <View className='bg-primary flex-1 p-4'>
//       <Text className="text-4xl text-accent mb-4">Saved!</Text>

//       {datas.length > 0 ? (
//         datas.map((item, index) => (
//           <View key={index} className="mb-2 p-2 bg-secondary rounded">
//             <Text className="text-white text-lg">{item}</Text>
//           </View>
//         ))
//       ) : (
//         <Text className="text-white">No saved movies yet.</Text>
//       )}
//     </View>
//   )
// }

// export default Saved

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View, ScrollView,FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSavedMovies } from '@/services/appwrite'
import { useUser } from '@clerk/clerk-expo'
import MoiveCard from '@/component/MoiveCard'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

const Saved = () => {
  const { user } = useUser()
  const email = user?.primaryEmailAddress
  const [movieDetails, setMovieDetails] = useState<any[]>([])
  const[saved,setSaved]=useState()

  useEffect(() => {
    if (!email) return

    const fetchData = async () => {
      try {
        const savedm = await getSavedMovies(email)
        setSaved(savedm)

        if (saved?.SaveId && Array.isArray(saved.SaveId)) {
          const promises = saved.SaveId.map(async (id: string) => {
            try {
              const response = await fetch(
                `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`,
                {
                  method: 'GET',
                  headers: TMDB_CONFIG.headers,
                }
              )

              if (!response.ok) {
                throw new Error(`Failed to fetch movie ID ${id}`)
              }

              const data = await response.json()
              return data
            } catch (err) {
              console.error('Error fetching details for ID', id, err)
              return null // prevent Promise.all from failing
            }
          })

          const results = await Promise.all(promises)
          const filtered = results.filter((movie) => movie !== null)
          setMovieDetails(filtered)
        }
      } catch (error) {
        console.error('Error fetching saved movies:', error)
      }
    }

    fetchData()
  },[saved])

  return (
<View className='bg-primary flex flex-1 '>
   <Image
        source={images.bg}
        className="absolute w-full z-0" />
  
  
  {/* <Text className="text-4xl text-accent mb-4">Saved Movies</Text> */}
    <View
    className='items-center justify-center mt-14 rounded-full w-auto  pt-2'
    >
      <View
      className=' pt-4 px-3 items-center justify-center rounded-full'
      >




      <Image
      source={icons.save}
      className='mb-6 size-10'
      
      />
      </View>
      </View>
  <ScrollView>
    <View className='items-center mt-22 justify-center gap-2'>
      <FlatList
        data={movieDetails}
        renderItem={({ item }: { item: any }) => (
          <MoiveCard {...item} />
        )}
        keyExtractor={(_, index: number) => index.toString()}
        numColumns={3}
            columnWrapperStyle={{justifyContent:'flex-start',gap:20,paddingRight:5,marginBottom:10}}
      />
    </View>
  </ScrollView>
</View>
  )
}

export default Saved

const styles = StyleSheet.create({})
