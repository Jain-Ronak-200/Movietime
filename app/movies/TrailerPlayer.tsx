import React from 'react';
import { Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

// Component that plays the YouTube video by extracting the video ID
const TrailerPlayer = ({ url }:any) => {
  // Extract video ID from URL
  const videoId = url.split("v=")[1]?.split("&")[0];

  if (!videoId) {
    return <Text>Invalid YouTube URL</Text>;  // If videoId extraction fails
  }

  return (
    <YoutubePlayer
      height={250}
      play={true}
      videoId={videoId}
    //   onChangeState={(event) => console.log(event)}  // Logs the state of the player
    />
  );
};

export default TrailerPlayer;


