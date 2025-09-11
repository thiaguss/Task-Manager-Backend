import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/tasks", taskRoutes);

export default app;
