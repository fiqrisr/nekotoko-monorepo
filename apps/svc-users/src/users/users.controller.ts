import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { CreateUserDto } from "./dtos/users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TypedRoute.Post()
  async create(@TypedBody() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @TypedRoute.Get()
  async findMany() {
    return this.usersService.findMany();
  }

  @TypedRoute.Get(":id")
  async findOne(@TypedParam("id") userId: string) {
    return this.usersService.findOneById(userId);
  }

  @TypedRoute.Post(":id")
  async update(
    @TypedParam("id") userId: string,
    @TypedBody() user: Partial<CreateUserDto>
  ) {
    return this.usersService.update(userId, user);
  }

  @TypedRoute.Delete(":id")
  async delete(@TypedParam("id") userId: string) {
    return this.usersService.delete(userId);
  }
}
