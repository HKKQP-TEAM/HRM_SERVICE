import type { Prisma, PrismaClient } from '@prisma/client';
import { Gender, JobType } from '@prisma/client';

import type {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from '~/core';
import { DI } from '~/providers';

import type { EmployeeRepository } from './employee.interface';
import type { EmployeeEntity } from './entities';

export class EmployeeRepositoryImpl implements EmployeeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async create(_entity: DeepPartial<EmployeeEntity>): Promise<EmployeeEntity> {
    return await this.prisma.employee.create({
      data: {
        email: 'user@example.com',
        firstName: 'string',
        lastName: 'string',
        title: 'string',
        gender: Gender.Male,
        job: JobType.Full,
        roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        departmentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        birthday: new Date().toISOString(),
      },
    });
  }

  async findOne(
    options: FindOneOptions<EmployeeEntity>,
  ): Promise<EmployeeEntity | null> {
    return await this.prisma.employee.findFirst({
      where: <Prisma.EmployeeWhereInput>options,
    });
  }

  async find(
    options?: FindManyOptions<EmployeeEntity>,
  ): Promise<Array<EmployeeEntity>> {
    return await this.prisma.employee.findMany({
      skip: options?.skip,
      take: options?.take,
      where: <Prisma.EmployeeWhereInput>options?.where,
    });
  }

  async findBy(
    options: FindOptionsWhere<EmployeeEntity>,
  ): Promise<Array<EmployeeEntity>> {
    return await this.prisma.employee.findMany({
      where: <Prisma.EmployeeWhereInput>{ ...options },
    });
  }

  async findOneBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<EmployeeEntity | null> {
    return await this.prisma.employee.findUnique({ where });
  }

  async findOneById(id: string): Promise<EmployeeEntity | null> {
    return await this.prisma.employee.findUnique({ where: { id } });
  }

  async countBy(where: Prisma.EmployeeWhereInput): Promise<number> {
    return await this.prisma.employee.count({ where });
  }

  async count(options?: FindManyOptions<EmployeeEntity>): Promise<number> {
    return await this.prisma.employee.count({
      skip: options?.skip,
      take: options?.take,
      where: <Prisma.EmployeeWhereInput>options?.where,
    });
  }

  async update(
    id: string,
    _entity: DeepPartial<EmployeeEntity>,
  ): Promise<EmployeeEntity> {
    return await this.prisma.employee.update({
      where: { id },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<EmployeeEntity> {
    return await this.prisma.employee.delete({ where: { id } });
  }
}
