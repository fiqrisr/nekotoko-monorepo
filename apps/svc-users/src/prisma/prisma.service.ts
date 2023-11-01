import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    "error" | "info" | "query" | "warn"
  >
  implements OnModuleInit
{
  constructor(
    @InjectPinoLogger(PrismaClient.name) private readonly logger: PinoLogger
  ) {
    super({
      log: [
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
  }

  async onModuleInit() {
    this.$on("error", (event) => {
      this.logger.error(event);
    });
    this.$on("info", (event) => {
      this.logger.info(event);
    });
    this.$on("warn", (event) => {
      this.logger.warn(event);
    });
    await this.$connect();
  }
}
