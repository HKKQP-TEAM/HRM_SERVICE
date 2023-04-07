import type { Prisma, PrismaClient } from '@prisma/client';

import type {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from '~/core';
import { DI } from '~/providers';

import type { CreateEmployeeDto } from './dto';
import type { EmployeeRepository } from './employee.interface';
import type { EmployeeEntity } from './entities';

export class EmployeeRepositoryImpl implements EmployeeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async createWithUid(
    uid: string,
    data: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const { roleId: _, departmentId: __, ...restData } = data;

    return this.create({
      ...restData,
      role: {
        connect: {
          id: data.roleId,
        },
      },
      department: {
        connect: {
          id: data.departmentId,
        },
      },
      createdBy: uid,
      updatedBy: uid,
    });
  }

  async create(entity: Prisma.EmployeeCreateInput): Promise<EmployeeEntity> {
    return await this.prisma.employee.create({ data: entity });
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

  async findWithRelational(
    options?: FindManyOptions<EmployeeEntity>,
    include?: Prisma.EmployeeInclude,
  ): Promise<Array<EmployeeEntity>> {
    return await this.prisma.employee.findMany({
      skip: options?.skip,
      take: options?.take,
      where: <Prisma.EmployeeWhereInput>options?.where,
      include,
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
    return await this.prisma.employee.findFirst({ where });
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
