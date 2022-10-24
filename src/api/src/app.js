import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/tasks", tasksRoutes);

app.use("/", (req, res) => {
  res.send({
    success: true,
    message: "API v.1",
  });
});

export default app;