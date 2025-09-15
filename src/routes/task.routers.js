import { Router } from "express";
import { getTasks, createTask, deletedTask, getTaskById, updatedTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById)
router.post("/", createTask);
router.patch("/:id", updatedTask);
router.post("/:id", deletedTask);


export default router;
