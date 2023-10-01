import { Injectable, OnModuleInit } from "@nestjs/common";

import { PrismaClient } from "@/generated/prisma-client.ts";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
