import {Client, Databases, ID, Query} from "react-native-appwrite"

// track the searches made by a user

const DATABASE_ID= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID =process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
// const COLLECTION_ID_USER=process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


    const database = new Databases(client)
    
export const udateSearchCount = async (query: string, movie: Movie) => {
    try {
        console.log("Starting udateSearchCount function...");
        console.log("Query:", query);
        console.log("Movie:", movie);

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);
        console.log("Result from listDocuments:", result.documents);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            console.log("Existing movie found:", existingMovie);

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: (existingMovie.count || 0) + 1
            });
            console.log("Document updated successfully.");
        } else {
            console.log("No existing movie found. Creating a new document...");

            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                moive_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
            console.log("Document created successfully.");
        }
    } catch (error) {
        console.log("Error in udateSearchCount:", error);
    }
};


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return undefined;
    }
};


const COLLECTION_ID_USER = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;
export const User = async(email:any):Promise<void>=>{
    try {
        
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_USER, [
            Query.equal('Email', email)
        ]);

        if (response.documents.length > 0) {
            console.log("User already exists with email:", email);
        } else {
            console.log("No user found. Creating a new user...");

            await database.createDocument(DATABASE_ID, COLLECTION_ID_USER, ID.unique(), {
            Email: email,
            // createdAt: new Date().toISOString()
            });
            console.log("User created successfully.");
        }
    } catch (error) {
        console.log("error in the login",error,email)
        
    }
}
 
export const savemovies = async (email:any,id:any): Promise<void> => {
    try {
        const Id = parseInt(id, 10);
        if (isNaN(Id)) {
            throw new Error("Invalid movie ID. It must be a valid integer.");
        }
         const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_USER, [
            Query.equal('Email', email)
        ]);
        if (response.documents.length > 0) {
            const userDocument = response.documents[0];
            const updatedSaveId = Array.isArray(userDocument.SaveId) 
            ? Array.from(new Set([...userDocument.SaveId, Id])) 
            : [Id];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID_USER, userDocument.$id, {
            SaveId: updatedSaveId
            });
            console.log("Movie ID saved successfully.");
        }
    } catch (error) {
        console.log("error in saving",error)
    }
}


export const getSavedMovies = async (email: any): Promise<number[] | any> => {
    try {
        email = String(email);
       const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_USER, [
            Query.equal('Email', email)
        ]);
        if (response.documents.length > 0) {
            const userDocument = response.documents[0];
            const savedMovieIds = Array.isArray(userDocument.SaveId) 
            ? userDocument.SaveId.map((id: any) => Number(id)).filter((id: number) => !isNaN(id)) 
            : [];
            // console.log("Saved movie IDs retrieved successfully:", savedMovieIds,userDocument);
            return userDocument as any;
        } else {
            console.log("No user found with the provided email.");
            return [];
        }
    } catch (error) {
        console.log("Error retrieving saved movie IDs:", error);
        return undefined;
    }
};