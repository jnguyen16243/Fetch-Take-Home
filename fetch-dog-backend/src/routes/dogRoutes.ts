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
    console.error("🐶 Error fetching breeds:", axiosError.response?.data || axiosError.message);

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
    console.error("🐶 Error fetching dogs:", axiosError.response?.data || axiosError.message);

    res.status(axiosError.response?.status || 500).json({
      error: axiosError.response?.data || "Error fetching dogs"
    });
  }
};


router.get("/breeds",authMiddleware, breedsHandler);
router.get("/search",authMiddleware, searchDogsHandler);

export default router;
