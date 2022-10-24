import express from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { ProjectsRepository } from "../repositories/ProjectsRepository.js";


const router = express.Router();

const projectsRepo = new ProjectsRepository();
const projectsController = new ProjectsController({ projectsRepo });

router.get("/", authMiddleware, async (req, res) => {
  projectsController.getAllProjects(req, res);
});
router.post("/", authMiddleware, async (req, res) => {
  projectsController.createProject(req, res);
});
router.put("/:id", authMiddleware, async (req, res) => {
  projectsController.updateProject(req, res);
});
router.delete("/:id", authMiddleware, async (req, res) => {
  projectsController.deleteProject(req, res);
});

export default router;