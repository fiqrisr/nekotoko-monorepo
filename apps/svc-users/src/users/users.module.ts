import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

import { PrismaService } from "@/prisma/prisma.service";
import { UsersRepository } from "@/users/users.repository";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService]
})
export class UsersModule {}
