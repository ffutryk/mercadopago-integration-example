import crypto from 'crypto';
import { MERCADOPAGO_AUTHENTICITY_SECRET } from '../config/secrets.js';

export class MercadoPagoService {
  async validateRequestOrigin(req) {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) return false;

    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const dataID = requestUrl.searchParams.get('data.id');
    if (!dataID) return false;

    const signatureParts = Object.fromEntries(
      xSignature.split(',').map((part) => {
        const [key, value] = part.split('=').map((s) => s.trim());
        return [key, value];
      })
    );

    const ts = signatureParts.ts;
    const hash = signatureParts.v1;

    if (!ts || !hash) return false;

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    const sha = crypto
      .createHmac('sha256', MERCADOPAGO_AUTHENTICITY_SECRET)
      .update(manifest)
      .digest('hex');

    return sha === hash;
  }
}
