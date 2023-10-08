import { Injectable } from "@nestjs/common";
import { hash } from "argon2";

import { transformStringFieldUpdateInput } from "@/utils";

import { DEFAULT_USER_SELECT } from "./users.constants";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dtos/users.dto";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const roles = ["user"];
    const password = await hash(data.password);

    return this.userRepository.create({
      data: {
        ...data,
        roles,
        password
      },
      select: DEFAULT_USER_SELECT
    });
  }

  async findMany() {
    return this.userRepository.findMany({
      select: DEFAULT_USER_SELECT
    });
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: DEFAULT_USER_SELECT
    });
  }

  async update(userId: string, data: Partial<CreateUserDto>) {
    let password = null;

    if (data.password) {
      password = await transformStringFieldUpdateInput(
        data.password,
        (password) => hash(password)
      );
    }

    return this.userRepository.update({
      where: { id: userId },
      data: {
        ...data,
        ...(password ? { password } : {})
      },
      select: DEFAULT_USER_SELECT
    });
  }

  async delete(userId: string) {
    return this.userRepository.delete({
      where: { id: userId },
      select: DEFAULT_USER_SELECT
    });
  }
}
