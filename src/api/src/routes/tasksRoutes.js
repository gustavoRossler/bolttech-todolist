import express from "express";
import { TasksController } from "../controllers/TasksController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { TasksRepository } from "../repositories/TasksRepository.js";


const router = express.Router();

const tasksRepo = new TasksRepository();
const tasksController = new TasksController({ tasksRepo });

router.get("/", authMiddleware, async (req, res) => {
  tasksController.getAllTasks(req, res);
});
router.post("/", authMiddleware, async (req, res) => {
  tasksController.createTask(req, res);
});
router.put("/:id", authMiddleware, async (req, res) => {
  tasksController.updateTask(req, res);
});
router.delete("/:id", authMiddleware, async (req, res) => {
  tasksController.deleteTask(req, res);
});

export default router;