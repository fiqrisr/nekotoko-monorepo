import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AllExceptionFilter } from "@nekotoko/shared-nest-utils";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

bootstrap();
