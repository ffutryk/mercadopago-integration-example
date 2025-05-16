import { MercadoPagoConfig } from 'mercadopago';
import { MERCADOPAGO_ACCESS_TOKEN } from './secrets.js';

export const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
});
