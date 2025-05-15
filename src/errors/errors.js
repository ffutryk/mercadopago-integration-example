import { HttpError } from './http-error.js';

export class InvalidWebhookRequest extends HttpError {
  constructor() {
    const messages = {
      en: 'The webhook request is invalid',
      es: 'La petición del webhook es inválida',
    };

    super(401, messages);
  }
}
