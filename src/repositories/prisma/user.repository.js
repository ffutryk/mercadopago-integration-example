import { prismaDatabase } from '../../config/database.js';

export class PrismaUserRepository {
  async findByUid(uid) {
    return await prismaDatabase.user.findUnique({
      where: { uid: uid },
    });
  }

  async findByEmail(email) {
    return await prismaDatabase.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return await prismaDatabase.user.findMany();
  }

  async create(user) {
    return await prismaDatabase.user.create({
      data: user,
    });
  }

  async update(uid, updateData) {
    return await prismaDatabase.user.update({
      where: { uid: uid },
      data: updateData,
    });
  }

  async delete(uid) {
    await prismaDatabase.user.delete({
      where: { uid: uid },
    });
  }
}
