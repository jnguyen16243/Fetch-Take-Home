import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import dogRoutes from "./routes/dogRoutes";
import locationRoutes from "./routes/locationRoutes"

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/locations",locationRoutes)

app.use((req, res, next) => {
  console.log(`📢 Received request: ${req.method} ${req.url}`);
  next();
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
