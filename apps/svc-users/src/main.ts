import { Logger } from "nestjs-pino";
import { AllExceptionFilter } from "@nekotoko/shared-nest-utils";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const httpAdapater = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapater));
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  await app.listen(configService.get("APP_PORT") ?? 3000);
}

bootstrap();
