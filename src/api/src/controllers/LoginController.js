import { JWT_SECRET } from "../server.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class LoginController {

  constructor({ usersRepo }) {
    this.usersRepo = usersRepo;
  }

  async handle(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.usersRepo.getUserByEmail(email);

      if (!user) {
        res.status(400).send({
          success: false,
          message: "User not found",
        });
        return false;
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res.status(400).send({
          success: false,
          message: "Invalid password",
        });
        return false;
      }

      const seconds = 60 * 60 * 2;
      const token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: seconds });

      delete user.password;

      res.send({
        success: true,
        token,
        user,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      });
    }
  }

}