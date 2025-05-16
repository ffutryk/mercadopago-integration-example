import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.service.js';
import { mercadoPagoService } from './mercadopago.container.js';
import { productRepository } from './product.container.js';

export const orderService = new OrderService(
  productRepository,
  mercadoPagoService
);
export const orderController = new OrderController(orderService);
