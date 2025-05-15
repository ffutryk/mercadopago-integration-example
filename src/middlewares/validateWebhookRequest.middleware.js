import { mercadoPagoService } from '../di/mercadopago.container.js';
import { InvalidWebhookRequest } from '../errors/errors.js';

export const validateWebhookRequest = async (req, res, next) => {
  try {
    const isValid = await mercadoPagoService.validateRequestOrigin(req);

    if (!isValid) throw new InvalidWebhookRequest();

    next();
  } catch (err) {
    next(err);
  }
};
