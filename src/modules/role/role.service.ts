import type { PrismaClient } from '@prisma/client';

import { DI } from '~/providers';

export class RoleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  findAll() {
    return this.prisma.role.findMany();
  }
}
