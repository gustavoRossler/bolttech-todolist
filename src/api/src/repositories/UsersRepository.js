import yesql from "yesql";
import { User } from "../models/User.js";
import { pool } from "../db.js";

export class UsersRepository {

  async getAllUsers() {
    const sql = "SELECT * FROM users";
    const res = await pool.query(yesql.pg(sql)({}));
    const list = res.rows;
    const users = [];
    for (let item of list) {
      const user = new User({
        ...item,
        createdAt: item?.created_at,
        updatedAt: item?.updated_at,
      });
      delete user.password;
      users.push(user);
    }
    return users;
  }

  async getUserByEmail(email) {
    const sql = "SELECT * FROM users where email = :email";
    const res = await pool.query(yesql.pg(sql)({ email, }));
    const list = res.rows;
    if (list.length) {
      const user = new User({
        ...list[0],
        createdAt: list[0]?.created_at,
        updatedAt: list[0]?.updated_at,
      });
      return user;
    }
    return null;
  }

  async getUserById(id) {
    const sql = "SELECT * FROM users where id = :id";
    const res = await pool.query(yesql.pg(sql)({ id, }));
    const list = res.rows;
    if (list.length) {
      const user = new User({
        ...list[0],
        createdAt: list[0]?.created_at,
        updatedAt: list[0]?.updated_at,
      });
      return user;
    }
    return null;
  }

  async createUser(user) {
    const sql = `
      INSERT INTO users (id, name, email, password, created_at) 
        VALUES (:id, :name, :email, :password, NOW())
    `;
    const res = await pool.query(yesql.pg(sql)({ ...user }));
    return res;
  }

  async updateUser(id, user) {
    const sql = `
      UPDATE 
        users 
      SET
        name = :name,
        email = :email,
        password = :password,
        updated_at = NOW()
      WHERE
        id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({ ...user, id }));
    return res;
  }

  async deleteUser(id) {
    const sql = `
      DELETE FROM users WHERE id = :id
    `;
    const res = await pool.query(yesql.pg(sql)({ id }));
    return res;
  }

}