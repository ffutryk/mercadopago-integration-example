import express from 'express';
import { orderController } from '../di/order.container.js';

export const orderRouter = express.Router();

orderRouter.post('/', orderController.create.bind(orderController));
