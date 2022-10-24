import { Project } from "../models/Project.js";
import { pool } from "../db.js";
import yesql from "yesql";

export const fakeProjects = [];

export class ProjectsRepository {

  async getProjectsByUser(userId) {
    const sql = "SELECT * FROM projects WHERE user_id = :userId";
    const res = await pool.query(yesql.pg(sql)({ userId }));
    const list = res.rows;
    const projects = [];
    for (let item of list) {
      const project = new Project({
        ...item,
        userId: item?.user_id,
      });
      projects.push(project);
    }
    return projects;
  }

  async getProjectByIdByUser(userId, id) {
    const sql = "SELECT * FROM projects where id = :id AND user_id = :userId";
    const res = await pool.query(yesql.pg(sql)({ id, userId, }));
    const list = res.rows;
    if (list.length) {
      const project = new Project({
        ...list[0],
        userId: list[0]?.user_id,
      });
      return project;
    }
    return null;
  }

  async createProject(project) {
    const sql = `
      INSERT INTO projects (id, name, user_id) 
        VALUES (:id, :name, :userId)
    `;
    const res = await pool.query(yesql.pg(sql)({ ...project }));
    return res;
  }

  async updateProject(id, project) {
    const sql = `
      UPDATE 
        projects 
      SET
        name = :name,
        user_id = :userId
      WHERE
        id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({ ...project, id }));
    return res;
  }

  async deleteProject(id) {
    const sqlTasks = `
      DELETE FROM tasks WHERE project_id = :id
    `;
    const resTasks = await pool.query(yesql.pg(sqlTasks)({ id }));
    const sql = `
      DELETE FROM projects WHERE id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({ id }));
    return res;
  }

}