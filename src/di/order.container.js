import { OrderController } from '../controllers/order.controller.js';
import { PrismaOrderRepository } from '../repositories/prisma/order.repository.js';
import { OrderService } from '../services/order.service.js';
import { mercadoPagoService } from './mercadopago.container.js';
import { productRepository } from './product.container.js';

export const orderRepository = new PrismaOrderRepository();
export const orderService = new OrderService(
  orderRepository,
  productRepository,
  mercadoPagoService
);
export const orderController = new OrderController(orderService);
