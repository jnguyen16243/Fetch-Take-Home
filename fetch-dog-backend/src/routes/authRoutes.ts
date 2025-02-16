import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();
const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const response = await axios.post(`${FETCH_API_URL}/auth/login`, { name, email }, { withCredentials: true });

    console.log("Set-Cookie Header:", response.headers["set-cookie"]);

    if (!response.headers["set-cookie"]) {
      res.status(401).json({ error: "Login failed: No authentication cookie received" });
      return;
    }

    const cookieString = response.headers["set-cookie"].find((cookie) =>
      cookie.startsWith("fetch-access-token")
    );

    if (!cookieString) {
      res.status(401).json({ error: "Authentication token not found in response" });
      return;
    }

    res.setHeader("Set-Cookie", cookieString);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    res.status(401).json({ error: "Login failed" });
  }
});

export default router;
