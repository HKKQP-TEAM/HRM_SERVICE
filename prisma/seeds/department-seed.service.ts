import type { Department, Prisma, PrismaClient } from '@prisma/client';
// ********************************************

const departmentData: Array<Prisma.DepartmentCreateInput> = [
  {
    departmentName: 'Development',
    createdBy: '45d16baa-5044-4e89-b428-d4822d6038f4',
    updatedBy: '45d16baa-5044-4e89-b428-d4822d6038f4',
  },
];

export class DepartmentSeedService {
  constructor(private prisma: PrismaClient) {}

  async run() {
    const departmentList: Array<
      Prisma.Prisma__DepartmentClient<Department, never>
    > = [];

    for (const department of departmentData) {
      const countDepartment = await this.prisma.department.count({
        where: {
          departmentName: department.departmentName,
        },
      });

      if (countDepartment > 0) continue;

      departmentList.push(
        this.prisma.department.create({
          data: department,
        }),
      );
    }

    await Promise.all(departmentList);
  }
}
