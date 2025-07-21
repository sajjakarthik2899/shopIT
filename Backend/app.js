import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });
import productRoutes from "./routes/products.js";
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js'
import { connectDatabase } from "./config/dbConnection.js";
import errorMiddleware from "./middlewares/errors.js";

process.on("uncaughtException", (error)=>{
    console.log(`Error is ${error}`);
    console.log("Shutting down the server");
    process.exit(1);
})
const app = express();
const PORT = process.env.PORT || 5000;
connectDatabase();
// console.log("PORT:", process.env.PORT);
// console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});
// So any file in the public folder can now be accessed directly via URL.
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use(errorMiddleware);
const server = app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});
process.on("unhandledRejection", (error) =>{
    console.log(`Error is ${error}`);
    console.log("Shutting down the server");
    server.close(()=>{
        process.exit(1);
    })
})
