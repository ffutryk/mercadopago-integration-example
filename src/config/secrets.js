import 'dotenv/config';

export const PORT = process.env.PORT ?? 3000;
export const NODE_ENV = process.env.NODE_ENV ?? 'dev';
export const MERCADOPAGO_AUTHENTICITY_SECRET =
  process.env.MERCADOPAGO_AUTHENTICITY_SECRET;
export const TOKEN = process.env.TOKEN;
export const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
