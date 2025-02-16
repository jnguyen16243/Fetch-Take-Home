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
    if (error.response) {
      if (error.response.status === 401) {
        res.status(401).json({ error: "Invalid credentials" });
      } else if (error.response.status === 500) {
        res.status(500).json({ error: "Internal server error. Please try again later." });
      } else {
        res.status(error.response.status).json({ error: error.response.data || "An error occurred" });
      }
    } else {
      res.status(500).json({ error: "Unexpected error occurred. Please try again later." });
    }
  }
});

router.post("/logout", async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.headers.cookie) {
      res.status(401).json({ error: "No authentication cookie found" });
      return;
    }


    await axios.post(`${FETCH_API_URL}/auth/logout`, {}, {
      headers: {
        Cookie: req.headers.cookie,
      },
      withCredentials: true,
    });

    res.setHeader("Set-Cookie", "fetch-access-token=; Path=/; Expires=Fri, 01 Jan 1958 00:00:00 GMT; HttpOnly");

    res.json({ success: true, message: "Log out successful" });
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: "Internal Server Error" });
  }
});
export default router;
