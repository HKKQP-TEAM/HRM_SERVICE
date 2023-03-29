import type { Prisma, PrismaClient, Role } from '@prisma/client';
// ********************************************

const roleData: Array<Prisma.RoleCreateInput> = [
  {
    roleName: 'Fullstack',
    createdBy: '45d16baa-5044-4e89-b428-d4822d6038f4',
    updatedBy: '45d16baa-5044-4e89-b428-d4822d6038f4',
  },
];

export class RoleSeedService {
  constructor(private prisma: PrismaClient) {}

  async run() {
    const roleList: Array<Prisma.Prisma__RoleClient<Role, never>> = [];

    for (const role of roleData) {
      const countRole = await this.prisma.role.count({
        where: {
          roleName: role.roleName,
        },
      });

      if (countRole > 0) continue;

      roleList.push(
        this.prisma.role.create({
          data: role,
        }),
      );
    }

    await Promise.all(roleList);
  }
}
