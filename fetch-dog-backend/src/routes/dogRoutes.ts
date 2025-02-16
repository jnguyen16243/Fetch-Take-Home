import { Router, Request, Response, RequestHandler } from "express";
import axios, { AxiosError } from "axios";

const router = Router();
const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";


const extractAuthToken = (req: Request): string | null => {
  if (!req.headers.cookie) return null;

  const cookieString = decodeURIComponent(req.headers.cookie);
  const cookiesArray = cookieString.split("; ").map(c => c.trim());


  const fetchAccessTokens = cookiesArray
    .filter(c => c.startsWith("fetch-access-token="))
    .map(c => c.split("=")[1]);

  return fetchAccessTokens.pop() || null;
};


const breedsHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const accessToken = extractAuthToken(req);

    if (!accessToken) {
      res.status(401).json({ error: "Missing fetch-access-token in request headers" });
      return;
    }

    const response = await axios.get(`${FETCH_API_URL}/dogs/breeds`, {
      headers: {
        Cookie: req.headers.cookie, // ✅ Forward all cookies
        Authorization: `Bearer ${accessToken}`,
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


const searchDogsHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const accessToken = extractAuthToken(req);

    if (!accessToken) {
      res.status(401).json({ error: "Missing fetch-access-token in request headers" });
      return;
    }

    const response = await axios.get(`${FETCH_API_URL}/dogs/search`, {
      params: req.query,
      headers: {
        Cookie: req.headers.cookie,
        Authorization: `Bearer ${accessToken}`,
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


router.get("/breeds", breedsHandler);
router.get("/search", searchDogsHandler);

export default router;
