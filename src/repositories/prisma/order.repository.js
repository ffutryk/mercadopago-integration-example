import { prismaDatabase } from '../../config/database.js';

export class PrismaOrderRepository {
  async findByUid(uid) {
    return await prismaDatabase.order.findUnique({
      where: { uid: uid },
    });
  }

  async findAll() {
    return await prismaDatabase.order.findMany();
  }

  async create(order) {
    return await prismaDatabase.order.create({
      data: {
        userUid: order.user.uid,
        items: {
          createMany: {
            data: order.items.map(({ uid, quantity }) => ({
              productUid: uid,
              quantity,
            })),
          },
        },
      },
      include: {
        items: {
          select: {
            product: true,
            quantity: true,
          },
        },
      },
    });
  }

  async update(uid, updateData) {
    return await prismaDatabase.order.update({
      where: { uid: uid },
      data: updateData,
    });
  }

  async delete(uid) {
    await prismaDatabase.order.delete({
      where: { uid: uid },
    });
  }
}
