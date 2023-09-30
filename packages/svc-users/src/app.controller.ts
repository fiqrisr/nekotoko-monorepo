import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/check-health")
  checkHealth(): string {
    return "up and running";
  }
}
