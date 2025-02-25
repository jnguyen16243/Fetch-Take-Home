import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  if (!req.headers.cookie) {
    res.status(401).json({ error: "No authentication cookie found in request headers" });
    return;
  }

  const cookieString = decodeURIComponent(req.headers.cookie);
  const cookiesArray = cookieString.split("; ").map(c => c.trim());

  const accessToken = cookiesArray
    .filter(c => c.startsWith("fetch-access-token="))
    .map(c => c.split("=")[1])
    .pop();

  if (!accessToken) {
    res.status(401).json({ error: "Missing fetch-access-token in request headers" });
    return;
  }

  req.authToken = accessToken; 
  next();
};


export default authMiddleware;
