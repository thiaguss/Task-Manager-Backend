import express from "express";
import dotenv from "dotenv";
import router from "./routes/task.routers.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/tasks", router);

// Middleware global de erros
app.use(errorHandler);

export default app;
