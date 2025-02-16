import axios from "axios";
import { Dog, User } from "../types";

const API_URL = "http://localhost:5000/api";

export const login = async (user: User): Promise<void> => {
  await axios.post(`${API_URL}/auth/login`, user, { withCredentials: true });
};


export const fetchBreeds = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/breeds`, { withCredentials: true });
  return response.data;
};


export const searchDogs = async (filters: Record<string, any>): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/search`, { params: filters, withCredentials: true });
  return response.data.resultIds; // Returns an array of dog IDs
};


export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  const response = await axios.post(`${API_URL}`, dogIds, { withCredentials: true });
  return response.data; // Returns an array of Dog objects
};
