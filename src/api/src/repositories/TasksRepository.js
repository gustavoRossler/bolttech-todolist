import yesql from "yesql";
import { Task } from "../models/Task.js";
import { pool } from "../db.js";

export class TasksRepository {

  async getTasksByProject(projectId) {
    const sql = "SELECT * FROM tasks WHERE project_id = :projectId";
    const res = await pool.query(yesql.pg(sql)({ projectId }));
    const list = res.rows;
    const tasks = [];
    for (let item of list) {
      const task = new Task({
        ...item,
        terminationDate: item?.termination_date,
        projectId: item?.project_id,
      });
      tasks.push(task);
    }
    return tasks;
  }

  async getTaskById(id) {
    const sql = "SELECT * FROM tasks where id = :id";
    const res = await pool.query(yesql.pg(sql)({ id, }));
    const list = res.rows;
    if (list.length) {
      const task = new Task({
        ...list[0],
        terminationDate: list[0]?.termination_date,
        projectId: list[0]?.project_id,
      });
      return task;
    }
    return null;
  }

  async createTask(task) {
    const sql = `
      INSERT INTO tasks (id, description, done, project_id) 
        VALUES (:id, :description, false, :projectId)
    `;
    const res = await pool.query(yesql.pg(sql)({
      ...task,
      terminationDate: task?.terminationDate ?? null,
      done: task?.done ?? false,
    }));
    return res;
  }

  async updateTask(id, task) {
    const sql = `
      UPDATE 
        tasks 
      SET
        description = :description,
        done = :done,
        termination_date = :terminationDate,
        project_id = :projectId
      WHERE
        id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({
      ...task,
      id,
      terminationDate: task?.terminationDate ?? null,
      done: task?.done ?? false,
    }));
    return res;
  }

  async deleteTask(id) {
    const sql = `
      DELETE FROM tasks WHERE id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({ id }));
    return res;
  }

}