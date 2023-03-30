import type { Prisma } from '@prisma/client';

import type { DeepPartial } from '~/core';

import type { CreateUserDto } from './dto';
import type { UserEntity } from './entities';

export abstract class UserService {
  abstract create(createProfileDto: CreateUserDto): Promise<UserEntity>;

  abstract findById(id: string): Promise<Omit<UserEntity, keyof UserEntity>>;

  abstract findByEmail(email: string): Promise<UserEntity>;

  abstract findByUsername(username: string): Promise<UserEntity>;
}

export abstract class UserRepository {
  abstract create(entity: DeepPartial<UserEntity>): Promise<UserEntity>;

  abstract findUniqueBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null>;

  abstract findById(id: string): Promise<UserEntity | null>;
}
