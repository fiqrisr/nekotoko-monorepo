import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoggerModule } from "nestjs-pino";

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
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
