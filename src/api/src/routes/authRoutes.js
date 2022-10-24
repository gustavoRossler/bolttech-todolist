import express from "express";
import { LoginController } from "../controllers/LoginController.js";
import { UsersRepository } from "../repositories/UsersRepository.js";


const router = express.Router();

const usersRepo = new UsersRepository();
const loginController = new LoginController({ usersRepo });

router.post("/login", async (req, res) => {
  loginController.handle(req, res);
});

export default router;