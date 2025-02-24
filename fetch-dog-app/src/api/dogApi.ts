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


export const searchDogs = async (filters: FiltersState, from?: string, sort?: string): Promise<{ dogs: Dog[]; fromCursor?: string }> => {
  try {
    const searchRequest = {
      breeds: filters.selectedBreeds,
      ageMin: filters.age.min,
      ageMax: filters.age.max,
      from: from
    };

    const response = await axios.get(`${API_URL}/dogs/search`, {
      params: searchRequest,
      withCredentials: true,
    });
    console.log(response);
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
      fromCursor: response.data.fromCursor || undefined, // Handle next query properly
    };
  } catch (error) {
    console.error("Error fetching dogs:", (error as AxiosError).message);
    return { dogs: [], fromCursor: undefined };
  }
};


export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  const response = await axios.post(`${API_URL}/dogs`, dogIds, { withCredentials: true });
  return response.data; // Returns an array of Dog objects
};
