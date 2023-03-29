import { PrismaClient } from '@prisma/client';

import { DI } from '../../src/providers';
import { DepartmentSeedService } from './department-seed.service';
import { RoleSeedService } from './role-seed.service';
import { UserSeedService } from './user-seed.service';

const prisma = new PrismaClient();

async function runSeed() {
  const userSeed = new UserSeedService(DI.instance.prismaService);
  const roleSeed = new RoleSeedService(DI.instance.prismaService);
  const departmentSeed = new DepartmentSeedService(DI.instance.prismaService);
  await userSeed.run();
  await roleSeed.run();
  await departmentSeed.run();
}

void (async function () {
  try {
    await runSeed();
  } catch {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
