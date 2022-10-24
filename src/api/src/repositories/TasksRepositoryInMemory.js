export const fakeTasks = [];

export class TasksRepositoryInMemory {

  async getTasksByProject(projectId) {
    return fakeTasks.filter(item => item.projectId === projectId);
  }

  async getTaskById(id) {
    return fakeTasks.find(item => item.id === id);
  }

  async createTask(task) {
    fakeTasks.push(task);
  }

  async updateTask(id, task) {
    const index = fakeTasks.findIndex(item => item.id === id);
    fakeTasks[index] = task;
  }

  async deleteTask(id, task) {
    const index = fakeTasks.findIndex(item => item.id === id);
    delete fakeTasks[index];
  }

}