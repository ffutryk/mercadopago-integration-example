export class MercadoPagoController {
  constructor(mercadoPagoService) {
    this.mercadoPagoService = mercadoPagoService;
  }

  async handleWebhook(req, res, next) {
    try {
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
