import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { userRepository } from './user.container.js';

export const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);
