import express from 'express';
import { createTask, updateTask, deleteTaskById, getAllTasks, getTasksOfMe } from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';
import validateTask from '../middleware/validateTask.js';

const taskRouter = express.Router();

taskRouter.post('/newtask', authMiddleware, validateTask, createTask);
taskRouter.put('/update/:id', authMiddleware, validateTask, updateTask);
taskRouter.get('/getTasksOfMe', authMiddleware, getTasksOfMe);
taskRouter.get('/getAllTasks', authMiddleware, getAllTasks);
taskRouter.delete('/deltask/:id', authMiddleware, deleteTaskById);

export default taskRouter;
