import express from "express";
import { UsersController } from "../controllers/UsersController.js";
import { UsersRepository } from "../repositories/UsersRepository.js";


const router = express.Router();

const usersRepo = new UsersRepository();
const usersController = new UsersController({ usersRepo });

router.get("/", async (req, res) => {
  usersController.getAllUsers(req, res);
});
router.post("/", async (req, res) => {
  usersController.createUser(req, res);
});

export default router;