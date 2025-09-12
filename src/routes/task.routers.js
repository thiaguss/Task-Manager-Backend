import { Router } from "express";
import { getTasks, createTask, deletedTask, getTaskById } from "../controllers/task.controller.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById)
router.post("/", createTask);
router.post("/:id", deletedTask);


export default router;
