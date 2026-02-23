import { Image, Text, View, StatusBar, ScrollView, ActivityIndicator, FlatList} from "react-native";
import { Link, useRouter } from 'expo-router'
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/component/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchPopularMoives } from "@/services/api";
import MoiveCard from "@/component/MoiveCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/component/TrendingCard";
export default function Index() {
  const router = useRouter()

  const{
    data:trendingMovies,
    loading:trendingLoading,
    error:trendingerror
  }=useFetch(getTrendingMovies)
  const {data:movies,
    loading:moviesLoading,
    error:movieserror}= useFetch(()=>fetchPopularMoives({query:''}))
  return (
    <View 
    className="flex-1 bg-primary">
      <StatusBar
      translucent 
      backgroundColor="transparent"
      barStyle="dark-content" />

      <Image
      source={images.bg}
      className="absolute w-full z-0" />

      <ScrollView 
      className="flex-1 px-5"
       showsVerticalScrollIndicator={false} 
       contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}>

        <View
        className="items-center mt-20 mb-5">
          <Image
           source={icons.logo}
            className="w-12 h-10" />

          {moviesLoading || trendingLoading?
          (<ActivityIndicator
             size="large"
          color="#0000ff"
          className="mt-10 self-center"/>)
          :movieserror||trendingerror?(<Text className="text-white text-lg">Error{movieserror?.message||trendingerror?.message}</Text>)
          :(
            <View
             className="flex-row items-center justify-between w-full">
            <View
             className="flex-1 mt-5 ">
             <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            <>
            {trendingMovies&&(
              <View
              className="mt-10 ">
                <Text
                className="text-xl text-white font-bold mt-5 mb-3">Tranding movies</Text>
               <FlatList
               horizontal
               showsHorizontalScrollIndicator={false}
               ItemSeparatorComponent={()=><View className="w-4"/>}
              className="mb-4 mt-3" data={trendingMovies} 
              renderItem={({item,index}) =>{ 
                // {console.log("hello",item)}
                return (
                  <TrendingCard
                  
                  movie={item}
                  index={index}
                  />
                )}}
                keyExtractor={(item) => (item.moive_id ? item.moive_id.toString() : '')}
               />
              </View>
            )}
            <Text
            className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
            <FlatList
            data={movies}
            
          
            renderItem={({item})=>{
              // console.log("ggs",item)
              return(
              <MoiveCard
              {...item} 
              />
              
            )}}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{justifyContent:'flex-start',gap:20,paddingRight:5,marginBottom:10}}
            className="mt-2 pb-32"
            scrollEnabled={false}
             />
       
            </>
          </View>
          </View>
          )}
        </View>
         
      </ScrollView>
    </View>
  );
}
