export class OrderService {
  constructor(orderRepository, paymentService) {
    this.orderRepository = orderRepository;
    this.paymentService = paymentService;
  }

  async create(dto) {
    const order = await this.orderRepository.create(dto);

    const orderWithItems = {
      ...order,
      items: dto.items,
    };

    return await this.paymentService.createOrder(dto.user, orderWithItems);
  }
}
