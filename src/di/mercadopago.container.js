import { MercadoPagoService } from '../services/mercadopago.service.js';
import { MercadoPagoController } from '../controllers/mercadopago.controller.js';
import { orderRepository } from './shared.container.js';
import { productRepository } from './product.container.js';

export const mercadoPagoService = new MercadoPagoService(
  orderRepository,
  productRepository
);
export const mercadoPagoController = new MercadoPagoController(
  mercadoPagoService
);
