import { hash } from "argon2";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/users.dto";
import {
  DEFAULT_USER_SELECT,
  type UserWithoutPassword
} from "./users.constants";
import { UsersRepository } from "./users.repository";

import { transformStringFieldUpdateInput } from "@/utils";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<UserWithoutPassword> {
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

  async findMany(): Promise<UserWithoutPassword[]> {
    return this.userRepository.findMany({
      select: DEFAULT_USER_SELECT
    });
  }

  async findOneById(id: string): Promise<UserWithoutPassword | null> {
    return this.userRepository.findOne({
      where: { id },
      select: DEFAULT_USER_SELECT
    });
  }

  async update(
    userId: string,
    data: Partial<CreateUserDto>
  ): Promise<UserWithoutPassword> {
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
