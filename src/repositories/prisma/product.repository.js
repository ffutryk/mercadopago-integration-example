import { prismaDatabase } from '../../config/database.js';

export class PrismaProductRepository {
  async findByUid(uid) {
    return await prismaDatabase.product.findUnique({
      where: { uid: uid },
    });
  }

  async findAll() {
    return await prismaDatabase.product.findMany();
  }

  async create(product) {
    return await prismaDatabase.product.create({
      data: product,
    });
  }

  async update(uid, updateData) {
    return await prismaDatabase.product.update({
      where: { uid: uid },
      data: updateData,
    });
  }

  async delete(uid) {
    await prismaDatabase.product.delete({
      where: { uid: uid },
    });
  }
}
