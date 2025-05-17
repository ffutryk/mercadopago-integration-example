import crypto from 'crypto';
import {
  MERCADOPAGO_AUTHENTICITY_SECRET,
  BASE_URL,
} from '../config/secrets.js';
import { Preference, Payment } from 'mercadopago';
import { mercadoPagoClient } from '../config/mercadopago.js';
import { ProductNotFoundError } from '../errors/errors.js';

export class MercadoPagoService {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async validateRequestOrigin(req) {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) return false;

    const dataId = req.query['data.id'];
    if (!dataId) return false;

    const signatureParts = Object.fromEntries(
      xSignature.split(',').map((part) => {
        const [key, value] = part.split('=').map((s) => s.trim());
        return [key, value];
      })
    );

    const ts = signatureParts.ts;
    const hash = signatureParts.v1;

    if (!ts || !hash) return false;

    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const sha = crypto
      .createHmac('sha256', MERCADOPAGO_AUTHENTICITY_SECRET)
      .update(manifest)
      .digest('hex');

    const hashBuffer = Buffer.from(hash, 'hex');
    const shaBuffer = Buffer.from(sha, 'hex');

    if (hashBuffer.length !== shaBuffer.length) return false;

    return crypto.timingSafeEqual(shaBuffer, hashBuffer);
  }

  async handleEvent(event) {
    switch (event.action) {
      case 'payment.created':
        await this.handlePaymentCreated(event.data);
        break;
      case 'payment.updated':
        await this.handlePaymentUpdated(event.data);
        break;
      default:
        console.warn(`Unhandled MercadoPago event: ${event.action}`);
    }
  }

  async handlePaymentCreated(data) {
    const payment = await new Payment(mercadoPagoClient).get({ id: data.id });

    // Business logic for when a payment is created

    console.log(payment);
  }

  async handlePaymentUpdated(data) {
    const payment = await new Payment(mercadoPagoClient).get({ id: data.id });

    // Business logic for when a payment is updated

    console.log(payment);
  }

  async createOrder(buyer, orderWithItems) {
    const preference = new Preference(mercadoPagoClient);

    const items = await Promise.all(
      orderWithItems.items.map(async ({ uid, quantity }) => {
        const product = await this.productRepository.findByUid(uid);

        if (!product) throw new ProductNotFoundError();

        return {
          quantity,
          id: product.uid,
          title: product.name,
          description: product.description,
          unit_price: Number(product.unitPrice),
        };
      })
    );

    const response = await preference.create({
      body: {
        items,
        payer: {
          name: buyer.name,
          surname: buyer.surname,
          email: buyer.email,
        },
        notification_url: `${BASE_URL}/mercadopago/webhook`,
        back_urls: {
          // Redirect URLs after payment
          success: 'https://yourwebsite.com/success',
          failure: 'https://yourwebsite.com/failure',
          pending: 'https://yourwebsite.com/pending',
        },
        external_reference: orderWithItems.uid,
      },
    });

    return response;
  }
}
