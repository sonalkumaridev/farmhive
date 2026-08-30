// server.js
import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import fs from "fs";
import path from "path";
import { body, validationResult } from "express-validator";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contact.route.js";

dotenv.config();

// Database connection
await connectDB();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());



// JSON file path for storing contact form data
const filePath = path.join(process.cwd(), "contact.json");


// ------------------------ AUTH API ------------------------
import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);



// Contact Router
// Contact Router
app.use("/api/contact", contactRouter);

// Product Router
import productRouter from "./routes/product.route.js";
app.use("/api/products", productRouter);

// ------------------------ START SERVER ------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

