import express from 'express';
import { authController } from '../di/auth.container.js';

export const authRouter = express.Router();

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
