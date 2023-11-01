import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [AppController],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty"
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ]
})
export class AppModule {}
