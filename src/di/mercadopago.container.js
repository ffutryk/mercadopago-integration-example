import { MercadoPagoService } from '../services/mercadopago.service.js';
import { MercadoPagoController } from '../controllers/mercadopago.controller.js';
import { orderRepository } from './shared.container.js';

export const mercadoPagoService = new MercadoPagoService(orderRepository);
export const mercadoPagoController = new MercadoPagoController(
  mercadoPagoService
);
