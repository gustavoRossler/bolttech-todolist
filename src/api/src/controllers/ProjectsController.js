import { v4 } from "uuid";
import { Project } from "../models/Project.js";

export class ProjectsController {

  constructor({ projectsRepo }) {
    this.projectsRepo = projectsRepo;
  }

  async getAllProjects(req, res) {
    try {
      const user = req?.user;

      const projects = await this.projectsRepo.getProjectsByUser(user?.id);
      res.send({
        success: true,
        projects,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async createProject(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).send({
          success: false,
          message: "Invalid data, name is required",
        });
        return false;
      }

      const user = req?.user;

      const project = new Project({
        id: v4(),
        name,
        userId: user?.id,
      });

      await this.projectsRepo.createProject(project);

      res.status(201).send({
        success: true,
        message: "Project create successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async updateProject(req, res) {
    try {
      const { id } = req?.params;
      const { name } = req.body;

      const user = req?.user;

      const project = await this.projectsRepo.getProjectByIdByUser(user?.id, id);
      if (!project) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
        return false;
      }

      if (!name) {
        res.status(400).send({
          success: false,
          message: "Invalid data, name is required",
        });
        return false;
      }

      await this.projectsRepo.updateProject(id, { ...project, name });

      res.status(200).send({
        success: true,
        message: "Project updated successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req?.params;

      const user = req?.user;

      const project = await this.projectsRepo.getProjectByIdByUser(user?.id, id);
      if (!project) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
        return false;
      }

      await this.projectsRepo.deleteProject(id);

      res.status(200).send({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

}