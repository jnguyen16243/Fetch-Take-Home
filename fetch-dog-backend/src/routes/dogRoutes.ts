import { Router, Request, Response, RequestHandler } from "express";
import axios, { AxiosError } from "axios";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";


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
      error: axiosError.response?.data || "Error fetching breeds"
    });
  }
};


const searchDogsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${FETCH_API_URL}/dogs/search`, {
      params: req.query,
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
      error: axiosError.response?.data || "Error fetching dogs"
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
    }
    if (req.body.length > 100) {
       res.status(400).json({ error: "Too many IDs: Maximum is 100" });
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
    //Use matched dog id to get match dog information 
    const dogResponse = await axios.post(`${FETCH_API_URL}/dogs`, [matchedDogId], {
      headers: {
        Cookie: req.headers.cookie,
        Authorization: `Bearer ${req.authToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    res.json(dogResponse.data[0]); 
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(axiosError.response?.status || 500).json({
      error: axiosError.response?.data || "Error matching dog",
    });
  }
};

router.get("/breeds",authMiddleware, breedsHandler);
router.get("/search",authMiddleware, searchDogsHandler);
router.post("/", authMiddleware, dogsHandler);
router.post("/match", authMiddleware, matchDogHandler);


export default router;
