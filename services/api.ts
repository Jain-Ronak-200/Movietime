export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accepet: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchPopularMoives = async ({query}:{query:string})=>{
    const endpoint = query?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
    const response = await fetch(endpoint,{
        method: 'GET',
        headers:TMDB_CONFIG.headers,
})
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`)

        
    }
    const data = await response.json()
    return data.results
}

export const fetchMovieDetails = async (movieId:string):Promise<MovieDetails>=>{
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        })
        if (!response.ok) {
            throw new Error('Failed to fetch movie details')        
        }
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error fetching movie details:', error)
        throw error
    }
}

// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGE5NWE2MzZlZmE1NjQ5OGFlZGUwOGIxYTZjYmUyMSIsIm5iZiI6MTc0NTcyMzMwMS42NDQsInN1YiI6IjY4MGQ5ZmE1ODA3N2QyNTgwMTM3ZGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fpM-RKC0RD8WT9FzQIod2DfNeDRkIogks4jpgF-ZMf8'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));



// const fetcht = async()=>{
//     try {
//         const endpoint = `https://api.themoviedb.org/3/movie/550/videos?${TMDB_CONFIG.API_KEY}`

//     const response = await fetch(endpoint,{
//         method: 'GET',
//         headers:TMDB_CONFIG.headers,
// })
//  if (!response.ok) {
//             throw new Error('Failed to fetch movie details')        
//         }
//         console.log("data is fecth",response)
//         const data = await response.json()
//         return data
        
//     } catch (error) {
//         console.log(error)
//     }

// }
// fetcht()
export async function getMovieTrailer(movieId:any) {
  const accessToken = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGE5NWE2MzZlZmE1NjQ5OGFlZGUwOGIxYTZjYmUyMSIsIm5iZiI6MTc0NTcyMzMwMS42NDQsInN1YiI6IjY4MGQ5ZmE1ODA3N2QyNTgwMTM3ZGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fpM-RKC0RD8WT9FzQIod2DfNeDRkIogks4jpgF-ZMf8`
// EXPO_PUBLIC_APPWRITE_PROJECT_ID=680b630b00344ca84051

  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch trailer:', response.statusText);
    return null;
  }

  const data = await response.json();

  // Filter for trailers from YouTube
  const trailer = data.results.find(video =>
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailer) {
    console.log('No trailer found for this movie.');
    return null;
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
  return youtubeUrl;
}

// Example usage:
// getMovieTrailer(551).then(url => {
//   if (url) {
//     console.log('Trailer URL:', url);
//   }
// });
