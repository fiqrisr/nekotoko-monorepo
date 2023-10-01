import { Controller } from "@nestjs/common";
import { TypedParam, TypedRoute } from "@nestia/core";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TypedRoute.Get()
  async findMany() {
    return this.usersService.findMany({
      select: {
        id: true,
        username: true,
        full_name: true,
        roles: true,
        created_at: true,
        updated_at: true
      }
    });
  }

  @TypedRoute.Get(":id")
  async findOne(@TypedParam("id") userId: string) {
    return this.usersService.findOne({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        full_name: true,
        roles: true,
        created_at: true,
        updated_at: true
      }
    });
  }
}
