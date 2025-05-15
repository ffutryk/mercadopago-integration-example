import { mercadoPagoService } from '../di/mercadopago.container.js';
import { InvalidWebhookRequest } from '../errors/errors.js';

export const validateWebhookRequest = (req, res, next) => {
  try {
    const isValid = mercadoPagoService.validateRequestOrigin(req);

    if (!isValid) throw new InvalidWebhookRequest();

    next();
  } catch (err) {
    next(err);
  }
};
