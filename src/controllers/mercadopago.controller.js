export class MercadoPagoController {
  constructor(mercadoPagoService) {
    this.mercadoPagoService = mercadoPagoService;
  }

  async handleWebhook(req, res, next) {
    try {
      const event = req.body;

      await this.mercadoPagoService.handleEvent(event);

      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
