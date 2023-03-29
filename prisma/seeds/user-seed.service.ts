import type { Prisma, PrismaClient, User } from '@prisma/client';
import { UserRole } from '@prisma/client';

import { BcryptHelper } from '../../src/core';

// ********************************************

const userData: Array<Prisma.UserCreateInput> = [
  {
    id: '45d16baa-5044-4e89-b428-d4822d6038f4',
    email: 'hrm@gmail.com',
    username: 'hrmadmin',
    password: 'hrmadmin',
    lastActivity: new Date(),
    emailVerifiedAt: new Date(),
    role: UserRole.Manager,
  },
];

export class UserSeedService {
  constructor(private prisma: PrismaClient) {}

  async run() {
    const userList: Array<Prisma.Prisma__UserClient<User, never>> = [];

    for (const user of userData) {
      const hashedPassword = await BcryptHelper.hash(user.password);

      const countManager = await this.prisma.user.count({
        where: {
          email: user.email,
        },
      });

      if (countManager > 0) continue;

      userList.push(
        this.prisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
          },
        }),
      );
    }

    await Promise.all(userList);
  }
}
