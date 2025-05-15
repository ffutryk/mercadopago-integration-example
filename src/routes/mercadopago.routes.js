import express from 'express';
import { mercadoPagoController } from '../di/mercadopago.container.js';
import { validateWebhookRequest } from '../middlewares/validateWebhookRequest.middleware.js';

export const mercadoPagoRouter = express.Router();

mercadoPagoRouter.post(
  '/webhook',
  validateWebhookRequest,
  mercadoPagoController.handleWebhook.bind(mercadoPagoController)
);
