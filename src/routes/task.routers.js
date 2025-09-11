import { Router } from "express";
import { getTasks, createTask, deletedTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.post("/:id", deletedTask);

export default router;
