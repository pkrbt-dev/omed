import { prisma, PrismaClient, Prisma, type User as UserModel } from "./client";

class User {
  public client: PrismaClient["user"];

  constructor(client: PrismaClient) {
    this.client = client.user;
  }

  async upsert(payload: Prisma.UserUpsertArgs["create"]) {
    await this.client.upsert({
      where: {
        email: payload.email,
      },
      create: payload,
      update: payload,
    });
  }

  async remove(id: string) {
    await this.client.delete({
      where: {
        id,
      },
    });
  }

  async findId(id: string) {
    return await this.findFirst({ id });
  }

  async findFirst(payload: Prisma.UserFindFirstArgs["where"]) {
    return await this.client.findFirst({
      where: {
        ...payload,
      },
    });
  }
}

export default function createUser(client?: PrismaClient) {
  return new User(client ?? prisma);
}
