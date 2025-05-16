export class OrderService {
  constructor(productRepository, paymentService) {
    this.productRepository = productRepository;
    this.paymentService = paymentService;
  }

  async create(dto) {
    const { user: buyer, items } = dto;

    const parsedItemsResults = await Promise.allSettled(
      items.map(async ({ uid, quantity }) => {
        const product = await this.productRepository.findByUid(uid);

        if (!product) throw new Error('Product in order items was not found');

        return {
          id: uid,
          title: product.name,
          description: product.description,
          unit_price: Number(product.unitPrice),
          quantity,
        };
      })
    );

    const rejected = parsedItemsResults.find(
      (result) => result.status === 'rejected'
    );
    if (rejected) throw rejected.reason;

    const parsedItems = parsedItemsResults.map((result) => result.value);

    return await this.paymentService.createOrder(buyer, parsedItems);
  }
}
