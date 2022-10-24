import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { User } from "../models/User.js";

export class UsersController {

  constructor({ usersRepo }) {
    this.usersRepo = usersRepo;
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.usersRepo.getAllUsers();
      res.send({
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).send({
          success: false,
          message: "Invalid data",
        });
        return false;
      }

      const saltRounds = 8;
      const encPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        id: v4(),
        name,
        email,
        password: encPassword,
        createdAt: Date.now(),
      });

      await this.usersRepo.createUser(user);

      res.status(201).send({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

}