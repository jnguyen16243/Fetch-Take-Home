import axios, { AxiosError } from "axios";
import { Dog, User } from "../types";
import { FiltersState } from "../pages/Search";

const API_URL = "http://localhost:5000/api";

export const login = async (user: User): Promise<void> => {
  await axios.post(`${API_URL}/auth/login`, user, { withCredentials: true });
};
export const logout = async (): Promise<void> =>{
  await axios.post(`${API_URL}/auth/logout`,{}, { withCredentials: true });
}


export const fetchBreeds = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/dogs/breeds`, { withCredentials: true });
  return response.data;
};



let lastCity: string | null = null;
let lastState: string | null = null;
let cachedZipCodes: string[] = [];

export const searchDogs = async (filters: FiltersState, from?: string, sort?: string): Promise<{ dogs: Dog[]; fromCursor?: string }> => {
  try {
    let zipCodes: string[] = [];

    // Only call locations API if city or state has changed
    if ((filters.city && filters.city !== lastCity) || (filters.state && filters.state !== lastState)) {
      const locationSearchRequest = { states: [filters.state], city: filters.city, size: 100 };
      console.log("Calling locations API with:", locationSearchRequest);

      const zipCodeResponse = await axios.post(`${API_URL}/locations/search`, locationSearchRequest, { withCredentials: true });

      if (zipCodeResponse.data && Array.isArray(zipCodeResponse.data.zipCodes)) {
        zipCodes = zipCodeResponse.data.zipCodes;
        // Cache the result
        cachedZipCodes = zipCodes;
        lastCity = filters.city;
        lastState = filters.state;
      } else {
        console.warn("No zip codes found for the given location.");
        cachedZipCodes = [];
      }
    } else {
      console.log("Using cached zip codes:", cachedZipCodes);
      zipCodes = cachedZipCodes;
    }

    // Prepare search request for dogs
    const searchRequest = {
      breeds: filters.selectedBreeds,
      ageMin: filters.age.min,
      ageMax: filters.age.max,
      from: from,
      zipCodes: zipCodes.length > 0 ? zipCodes : undefined,
      sort: sort || undefined, 
    };
    console.log("calling dogs search", searchRequest)
    const response = await axios.get(`${API_URL}/dogs/search`, {
      params: searchRequest,
      withCredentials: true,
    });

    if (!response.data || !response.data.dogs || !Array.isArray(response.data.dogs)) {
      throw new Error("Invalid response format from API.");
    }

    return {
      dogs: response.data.dogs.map((dog: any) => ({
        id: dog.id || "unknown",
        name: dog.name || "Lucky",
        breed: dog.breed || "Mutt",
        age: typeof dog.age === "number" ? dog.age : 0,
        zip_code: dog.zip_code || "Unknown",
        img: dog.img,
      })),
      fromCursor: response.data.fromCursor || undefined,
    };
  } catch (error) {
    console.error("Error fetching dogs:", (error as AxiosError).message);
    return { dogs: [], fromCursor: undefined };
  }
};




export const matchDog = async (dogIds: string[]): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/dogs/match`, dogIds, { withCredentials: true });
    
    console.log("Matched Dog ID:", response.data.matchedDogId);
    
    return response.data.matchedDogId;
  } catch (error) {
    console.error("Error fetching matched dog:", error);
    throw error;
  }
};

