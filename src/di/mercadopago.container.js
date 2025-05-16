import { MercadoPagoService } from '../services/mercadopago.service.js';
import { MercadoPagoController } from '../controllers/mercadopago.controller.js';
import { PrismaOrderRepository } from '../repositories/prisma/order.repository.js';

// Should fix this (should import orderRepository from order.container but order.container also imports mercadopago.container)
const orderRepository = new PrismaOrderRepository();
export const mercadoPagoService = new MercadoPagoService(orderRepository);
export const mercadoPagoController = new MercadoPagoController(
  mercadoPagoService
);
