import express from 'express';
import { loginUser,logout,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);

export default userRouter;