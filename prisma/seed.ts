import type { Prisma, Role, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { logger } from '../src/utils';

const prisma = new PrismaClient();
const roleData: Array<Prisma.RoleCreateInput> = [
  { name: 'Admin' },
  { name: 'User' },
];

const userStatusData: Array<Prisma.UserStatusCreateInput> = [
  { name: 'Active' },
  { name: 'Inactive' },
];

const userData: Array<Prisma.UserCreateInput> = [
  {
    email: 'admin@gmail.com',
    fullName: 'Admin',
    password: '@Passw0rd1',
    role: {
      connect: {
        id: 1,
      },
    },
    status: {
      connect: {
        id: 1,
      },
    },
  },
  {
    email: 'user@gmail.com',
    fullName: 'User',
    password: '@Passw0rd1',
    role: {
      connect: {
        id: 2,
      },
    },
    status: {
      connect: {
        id: 1,
      },
    },
  },
];

async function seedsRole() {
  return Promise.all(
    roleData.map<Prisma.Prisma__RoleClient<Role, never>>((role) =>
      prisma.role.create({
        data: {
          ...role,
        },
      }),
    ),
  );
}

async function seedUserStatus() {
  return Promise.all(
    userStatusData.map((userStatus) =>
      prisma.userStatus.create({
        data: {
          ...userStatus,
        },
      }),
    ),
  );
}

async function seedUser() {
  const userList: Array<Prisma.Prisma__UserClient<User, never>> = [];

  for (const user of userData) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    userList.push(
      prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      }),
    );
  }

  await Promise.all(userList);
}

async function main() {
  logger.info(`Start seeding ...`);

  await seedsRole();
  await seedUserStatus();
  await seedUser();

  logger.info(`Seeding finished.`);
}

void (async function () {
  try {
    await main();
    await prisma.$disconnect();
  } catch (error) {
    logger.error(error);
    await prisma.$disconnect();
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
})();
