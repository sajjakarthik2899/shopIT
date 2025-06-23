import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });
import productRoutes from "./routes/products.js";
import authRoutes from './routes/auth.js'
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

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use(errorMiddleware);
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});
process.on("unhandledRejection", (error) =>{
    console.log(`Error is ${error}`);
    console.log("Shutting down the server");
    server.close(()=>{
        process.exit(1);
    })
})
