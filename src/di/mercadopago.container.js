import { MercadoPagoService } from '../services/mercadopago.service.js';
import { MercadoPagoController } from '../controllers/mercadopago.controller.js';

export const mercadoPagoService = new MercadoPagoService();
export const mercadoPagoController = new MercadoPagoController(
  mercadoPagoService
);
