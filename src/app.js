import express from "express";
import dotenv from "dotenv";
import router from "./routes/task.routers.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/tasks", router);

export default app;
