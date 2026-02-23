import { Text, View, Image,ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import iconSet from '@expo/vector-icons/build/Fontisto';
import { icons } from '@/constants/icons';
import { useClerk } from "@clerk/clerk-react";
import { images } from '@/constants/images';

const UserProfile = () => {
      const { signOut } = useClerk();

    const { user } = useUser();

    return (
          <ScrollView contentContainerStyle={{ flexGrow: 1 ,backgroundColor:'#030014'}} >
            <Image
                  source={images.bg}
                  className="absolute w-full z-0" />

   
        <View className="h-auto pr-2 pl-2 items-center justify-start gap-2  mt-14 p-20 bg-white/15 backdrop:blur-3xl rounded-3xl">

      

            <View
            className='absolute right-4 mt-4 mr-3 bg-white/20 backdrop:backdrop-blur-3xl p-3 rounded-full'
             >
                 <TouchableOpacity
                 onPress={()=>signOut()}
                 >
                <Image
                source={icons.logout}
                />
                </TouchableOpacity>
            </View>
            {user?.imageUrl && (
                <Image
                source={{ uri: user.imageUrl }}
                className="w-32 h-32 rounded-full mb-4 border-4 border-white"
                />
            )}
            <View className='bg-white/10 backdrop:blur-3xl mb-5 p-3 rounded-full'>
                <Text className='text-white'>
                    Edit profile
                </Text>
            </View>
            <View className='bg-white/20 rounded-3xl p-9 backdrop-blur-2xl'>
            <Text className="text-4xl font-bold text-white mb-4">
            Hello, {user?.fullName || 'Movie Buff'}!
            </Text>

            <Text className="text-lg text-gray-100 mb-6 text-center bg-white/20 backdrop-blur-lg rounded-full px-4">
            Email
            </Text>
            <Text className="text-lg text-gray-100 mb-6 text-center">
            {user?.primaryEmailAddress?.toString() || 'No email provided'}
            </Text>
            </View>
           
        </View>
                </ScrollView>
    );
};

export default UserProfile;
