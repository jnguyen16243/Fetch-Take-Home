import axios, { AxiosError } from "axios";
import { Dog, FiltersState, User } from "../types.ts";

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const login = async (user: User): Promise<void> => {
  await apiClient.post("/auth/login", user);
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout", {});
};

export const fetchBreeds = async (): Promise<string[]> => {
  const response = await apiClient.get("/dogs/breeds");
  return response.data;
};

let lastCity: string | null = null;
let lastState: string | null = null;
let cachedZipCodes: string[] = [];

export const searchDogs = async (
  filters: FiltersState,
  from?: string,
  sort?: string
): Promise<{ dogs: Dog[]; fromCursor?: string }> => {
  try {
    let zipCodes: string[] = [];

    if ((filters.city && filters.city !== lastCity) || (filters.state && filters.state !== lastState)) {
      const locationSearchRequest = { states: [filters.state], city: filters.city, size: 100 };
      

      const zipCodeResponse = await apiClient.post("/locations/search", locationSearchRequest);

      if (zipCodeResponse.data && Array.isArray(zipCodeResponse.data.zipCodes)) {
        zipCodes = zipCodeResponse.data.zipCodes;
        cachedZipCodes = zipCodes;
        lastCity = filters.city;
        lastState = filters.state;
      } else {
        console.warn("No zip codes found for the given location.");
        cachedZipCodes = [];
      }
    } else {
      
      zipCodes = cachedZipCodes;
    }

    const searchRequest = {
      breeds: filters.selectedBreeds,
      ageMin: filters.age.min,
      ageMax: filters.age.max,
      from: from,
      zipCodes: zipCodes.length > 0 ? zipCodes : undefined,
      sort: sort || undefined,
    };
    

    const response = await apiClient.get("/dogs/search", { params: searchRequest });

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
    const response = await apiClient.post("/dogs/match", dogIds);
    
    return response.data.matchedDogId;
  } catch (error) {
    console.error("Error fetching matched dog:", error);
    throw error;
  }
};
