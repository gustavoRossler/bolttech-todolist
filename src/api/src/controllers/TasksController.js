import { v4 } from "uuid";
import { Task } from "../models/Task.js";

export class TasksController {

  constructor({ tasksRepo }) {
    this.tasksRepo = tasksRepo;
  }

  async getAllTasks(req, res) {
    try {
      const { projectId } = req.query;
      if (!projectId) {
        res.status(500).send({
          success: false,
          message: "Query param projectId is required",
        });
        return false;
      }

      const tasks = await this.tasksRepo.getTasksByProject(projectId);
      res.send({
        success: true,
        tasks,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async createTask(req, res) {
    try {
      const { description, projectId } = req.body;

      if (!description) {
        res.status(400).send({
          success: false,
          message: "Invalid data, description is required",
        });
        return false;
      }

      if (!projectId) {
        res.status(400).send({
          success: false,
          message: "Invalid data, projectId is required",
        });
        return false;
      }

      const task = new Task({
        id: v4(),
        description,
        done: false,
        projectId,
      });

      await this.tasksRepo.createTask(task);

      res.status(201).send({
        success: true,
        message: "Task create successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req?.params;
      const { description, done, terminationDate } = req.body;

      const task = await this.tasksRepo.getTaskById(id);
      if (!task) {
        res.status(404).send({
          success: false,
          message: "Task not found",
        });
        return false;
      }

      if (!description) {
        res.status(400).send({
          success: false,
          message: "Invalid data, description is required",
        });
        return false;
      }

      await this.tasksRepo.updateTask(id, { ...task, description, done, terminationDate });

      res.status(200).send({
        success: true,
        message: "Task updated successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req?.params;

      const task = await this.tasksRepo.getTaskById(id);
      if (!task) {
        res.status(404).send({
          success: false,
          message: "Task not found",
        });
        return false;
      }

      await this.tasksRepo.deleteTask(id);

      res.status(200).send({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

}