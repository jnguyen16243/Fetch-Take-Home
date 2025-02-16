import { Request, Response, NextFunction } from "express";


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.cookie; 

  if (!token) {
    res.status(401).json({ error: "Unauthorized - Please log in first" });
    return; 
  }

  next(); 
};

export default authMiddleware;
