import type { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'routing-controllers';

import { DI } from '~/providers';
import type { PaginationOptions } from '~/types';
import { excludeFields } from '~/utils';

import type { CreateUserDto, UpdateUserDto } from './dto';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async create(createProfileDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createProfileDto.password, salt);

    return this.prisma.user.create({
      data: {
        ...createProfileDto,
        password: hashedPassword,
      },
    });
  }

  findManyWithPagination(paginationOptions: PaginationOptions) {
    return this.prisma.user.findMany({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        include: {
          role: true,
          status: true,
        },
      });

      return excludeFields<User, keyof User>(user!, ['password', 'hash']);
    } catch {
      throw new NotFoundError('not found');
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
      include: {
        role: true,
        status: true,
      },
    });
  }

  update(id: number, updateProfileDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
