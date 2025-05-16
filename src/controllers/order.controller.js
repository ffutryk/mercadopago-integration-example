import { InvalidItemArrayError } from '../errors/errors.js';
import { isValidArrayOfItems } from '../utils/utils.js';

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async create(req, res, next) {
    try {
      const { items } = req.body;

      if (!isValidArrayOfItems(items)) throw new InvalidItemArrayError();

      const dto = {
        user: req.user,
        items,
      };

      const result = await this.orderService.create(dto);

      return res.status(200).json({ success: true, data: { result } });
    } catch (err) {
      next(err);
    }
  }
}
