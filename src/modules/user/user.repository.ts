import type { Prisma, PrismaClient } from '@prisma/client';

import type { DeepPartial } from '~/core';
import { DI } from '~/providers';

import type { UserEntity } from './entities';
import type { UserRepository } from './user.interface';

export class UserRepositoryIml implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async create(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: <Prisma.UserCreateInput>entity,
    });
  }

  async findUniqueBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
