import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import dogRoutes from "./routes/dogRoutes";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // ✅ Allow frontend to access backend
  credentials: true, // ✅ Allow cookies to be sent
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
