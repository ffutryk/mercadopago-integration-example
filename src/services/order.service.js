export class OrderService {
  constructor(orderRepository, productRepository, paymentService) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.paymentService = paymentService;
  }

  async create(dto) {
    const order = await this.orderRepository.create(dto);

    return await this.paymentService.createOrder(dto.user, order);
  }
}
