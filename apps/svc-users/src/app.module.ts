import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
