import { Injectable } from "@nestjs/common";

import { Prisma } from "@/generated/prisma-client.ts";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ) {
    return this.prismaService.user.create<T>(args);
  }

  async findMany<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ) {
    return this.prismaService.user.findMany(args);
  }

  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ) {
    return this.prismaService.user.findUnique(args);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ) {
    return this.prismaService.user.update<T>(args);
  }

  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ) {
    return this.prismaService.user.delete(args);
  }
}
