import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  checkHealth(): string {
    return "up and running";
  }
}
