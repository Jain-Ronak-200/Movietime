import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { Loader } from '@/component/Loading'
import UserProfile from '@/component/UserProfile'
import { User } from '@/services/appwrite'

const profile = () => {
  const{user}=useUser()
 const { isSignedIn, isLoaded } = useAuth()
 if (isSignedIn) {
  const email = user?.primaryEmailAddress?.toString()
  // console.log("b;yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",email)
  if (email) {
    User(email);
  }
  
 }
  
useEffect(() => {
  
  if (!isLoaded) {
    // Perform any side effects if needed when not loaded
  }
}, [isLoaded]);

if (!isLoaded) {
  return <Loader />;
}

return !isSignedIn ? (
  <Redirect href="/(auth)/login" />
) : (
  
  <UserProfile />
);

}

export default profile

