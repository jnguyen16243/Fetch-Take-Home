import { Router, Request, Response, RequestHandler } from "express";
import axios, { AxiosError } from "axios";
import authMiddleware from "../middleware/authMiddleware";
import validateSearchDogs from "../middleware/validateSearchDogs";

const router = Router();
const FETCH_API_URL = process.env.FETCH_API_URL  || "https://frontend-take-home-service.fetch.com";
const MAX_DOG_IDS = 100;
export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  img: string;
  zip_code: string;
}
const breedsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${FETCH_API_URL}/dogs/breeds`, {
      headers: {
        Cookie: req.headers.cookie, 
        Authorization: `Bearer ${req.authToken}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    res.status(axiosError.response?.status || 500).json({
      error: "Error fetching breeds"
    });
  }
};



const fetchDogDetails = async (dogIds: string[], headers: Record<string, string>) => {
  if (!dogIds || dogIds.length === 0) {
    throw new Error("No valid dog IDs provided.");
  }

  const truncatedDogIds = dogIds.slice(0, MAX_DOG_IDS);

  const { data: dogResponse } = await axios.post(`${FETCH_API_URL}/dogs`, truncatedDogIds, {
    headers,
    withCredentials: true,
  });

  if(!dogResponse || !Array.isArray(dogResponse)){
    throw new Error("Invalid response from dogs details")
  }
  return dogResponse.map((dog: any) => ({
    id: dog.id || "unknown", 
    name: dog.name || "Lucky",
    breed: dog.breed || "Mutt",
    age: typeof dog.age === "number" ? dog.age : 0, 
    img: dog.img || undefined,
    zip_code: dog.zip_code || 0,
  }));

};

const searchDogsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const headers = {
      Cookie: req.headers.cookie || "",
      Authorization: `Bearer ${req.authToken}`,
      "Content-Type": "application/json",
    };
    
    const { data: { resultIds: dogIds, next: next } = {} } = await axios.get(`${FETCH_API_URL}/dogs/search`, {
      params: req.query,
      headers,
      withCredentials: true,
    });
    
    if (!dogIds || dogIds.length === 0) {
      
       res.status(404).json({ message: "No dogs found :(" });
       return;
    }


    const dogData = await fetchDogDetails(dogIds, headers);
    let fromCursor = null;
    if (next) {
      const urlParams = new URLSearchParams(next.split("?")[1]);
      fromCursor = urlParams.get("from") || null;
    }
    
    res.json({
      dogs: dogData,
      fromCursor: fromCursor,
    });
    // 
  } catch (error) {
    console.error("Error fetching dogs:", error);

    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({
      error: axiosError.response?.data || "An error occurred while fetching dogs.",
    });
  }
};

const dogsHandler: RequestHandler = async(req: Request, res: Response): Promise<void> =>{
  try{
    const {body} = req

    if (!Array.isArray(body) || body.length === 0) {
      res.status(400).json({ error: "Invalid request: Body is empty" });
      return;
    }
    
    if (body.length > 100) {
      res.status(400).json({ error: "Max IDs is 100" });
      return;
    }

    const response = await axios.post(
      `${FETCH_API_URL}/dogs`,
      body, 
      {
        headers: {
          Cookie: req.headers.cookie,
          Authorization: `Bearer ${req.authToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    res.json(response.data);
    }catch(error: unknown){
      const axiosError = error as AxiosError;

    res.status(axiosError.response?.status || 500).json({
      error: axiosError.response?.data || "Error fetching dog ids",
    });
  }
}

//  Handler to match a dog from the given list
const matchDogHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
       res.status(400).json({ error: "Invalid request: Must provide an array of dog IDs" });
       return;
    }
    if (req.body.length > 100) {
       res.status(400).json({ error: "Too many IDs: Maximum is 100" });
       return;
    }
    //Match dog 
    const matchResponse = await axios.post(`${FETCH_API_URL}/dogs/match`, req.body, {
      headers: {
        Cookie: req.headers.cookie,
        Authorization: `Bearer ${req.authToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const matchedDogId = matchResponse.data.match;
    res.json({matchedDogId: matchedDogId}); 
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({
      error: axiosError.response?.data || "Error matching dog",
    });
  }
};

router.get("/breeds",authMiddleware, breedsHandler);
router.get("/search",authMiddleware,validateSearchDogs, searchDogsHandler);
router.post("/", authMiddleware, dogsHandler);
router.post("/match", authMiddleware, matchDogHandler);


export default router;
