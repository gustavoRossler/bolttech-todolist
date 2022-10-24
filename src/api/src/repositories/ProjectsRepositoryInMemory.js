import { Project } from "../models/Project.js";

export const fakeProjects = [];

export class ProjectsRepositoryInMemory {

  async getProjectsByUser(userId) {
    return fakeProjects.filter(item => item.userId === userId);
  }

  async getProjectByIdByUser(userId, id) {
    return fakeProjects.find(item => item.id === id && item.userId === userId);
  }

  async createProject(project) {
    fakeProjects.push(project);
  }

  async updateProject(id, project) {
    const index = fakeProjects.findIndex(item => item.id === id);
    fakeProjects[index] = project;
  }

  async deleteProject(id) {
    const index = fakeProjects.findIndex(item => item.id === id);
    delete fakeProjects[index];
  }

}