import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.service.js';
import { mercadoPagoService } from './mercadopago.container.js';
import { orderRepository } from './shared.container.js';

export const orderService = new OrderService(
  orderRepository,
  mercadoPagoService
);
export const orderController = new OrderController(orderService);
