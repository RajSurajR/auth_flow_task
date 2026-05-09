import express from 'express';
import { isAdmin, isAuth } from '../middlewares/isAuth.middleware.js';
import { validateTodo } from '../middlewares/validation.middleware.js';
import { createTask, deleteAdminTask, deleteTask, getAllTasks, getUserTask, updateTask } from '../controllers/task.controller.js';

const router = express.Router()

router.post("/create", isAuth, validateTodo, createTask);
router.patch("/update", isAuth, validateTodo, updateTask);
router.get("/my-tasks", isAuth, getUserTask);
router.delete("/delete", isAuth, deleteTask);

// Admin routes
router.get("/all-tasks", isAuth, isAdmin, getAllTasks);
router.delete("/admin-delete", isAuth, isAdmin, deleteAdminTask);

export default router