import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config.js";   // config import
import commentRoutes from "./routes/commentRoutes.js";
import setupSwagger from "./config/swagger.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/comments", commentRoutes);

// Swagger Documentation
setupSwagger(app);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// DB 연결
mongoose
  .connect(config.mongoURI, { dbName: "worki-2-backend" })
  .then(() => console.log("✅ MongoDB Connected (worki-2-backend DB)"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// 서버 실행
app.listen(config.port, () => {
  console.log(`🚀 worki-2-backend running on port ${config.port}`);
});
