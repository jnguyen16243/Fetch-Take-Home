import { Router, Request, Response, RequestHandler } from "express";
import axios, { AxiosError } from "axios";
import authMiddleware from "../middleware/authMiddleware";
import validateLocationSearchBody from "../middleware/validateLocationSearchBody";

const router = Router();
const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";


const locationsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const {body} = req;
    if (!Array.isArray(req.body) || req.body.length === 0) {
        res.status(400).json({ error: "Invalid request: Must provide an array of zip codes" });
     }
     if (req.body.length > 100) {
        res.status(400).json({ error: "Too many zipcodes: Maximum is 100" });
     }
    const response = await axios.post(`${FETCH_API_URL}/locations`,req.body, {
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
      error: axiosError.response?.data || "Error fetching locations"
    });
  }
};


const searchLocationHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const {body} = req
    const response = await axios.post(`${FETCH_API_URL}/locations/search`, body,{
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
      error: axiosError.response?.data || "Error fetching locations"
    });
  }
};

router.post("/", authMiddleware, locationsHandler);
router.post("/search",authMiddleware,validateLocationSearchBody, searchLocationHandler);




export default router;
