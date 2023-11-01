import { LoggerModule } from "nestjs-pino";
import { PrismaModule } from "nestjs-prisma";
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
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: "event",
              level: "error"
            },
            {
              emit: "event",
              level: "warn"
            }
          ]
        }
      }
    }),
    UsersModule
  ]
})
export class AppModule {}
