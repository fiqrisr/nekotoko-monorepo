import { Controller } from "@nestjs/common";
import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/users.dto";
import { DEFAULT_USER_SELECT } from "./users.constants";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TypedRoute.Post()
  async create(@TypedBody() user: CreateUserDto) {
    return this.usersService.create({
      data: user,
      select: DEFAULT_USER_SELECT
    });
  }

  @TypedRoute.Get()
  async findMany() {
    return this.usersService.findMany({
      select: DEFAULT_USER_SELECT
    });
  }

  @TypedRoute.Get(":id")
  async findOne(@TypedParam("id") userId: string) {
    return this.usersService.findOne({
      where: { id: userId },
      select: DEFAULT_USER_SELECT
    });
  }

  @TypedRoute.Post(":id")
  async update(
    @TypedParam("id") userId: string,
    @TypedBody() user: Partial<CreateUserDto>
  ) {
    return this.usersService.update({
      where: {
        id: userId
      },
      data: user,
      select: DEFAULT_USER_SELECT
    });
  }
}
