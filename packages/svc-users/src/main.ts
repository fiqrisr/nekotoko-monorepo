import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  await app.listen(configService.get("APP_PORT") ?? 3000);
}

bootstrap();
