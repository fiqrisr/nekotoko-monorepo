import { Logger } from "nestjs-pino";
import { PrismaService } from "nestjs-prisma";
import { AllExceptionFilter } from "@nekotoko/shared-nest-utils";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const logger = app.get(Logger);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));

  prismaService.$on("error", (event) => {
    logger.error(event);
  });

  prismaService.$on("warn", (event) => {
    logger.warn(event);
  });

  await app.listen(configService.get("APP_PORT") ?? 3000);
}

bootstrap();
