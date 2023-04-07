import type { Prisma } from '@prisma/client';

import type { FindManyOptions, PaginationOptions } from '~/core';
import { BaseRepository } from '~/core';

import type { CreateEmployeeDto } from './dto';
import type { EmployeeEntity } from './entities';

export abstract class EmployeeService {
  abstract create(
    uid: string, // createdBy, updatedBy
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity>;

  abstract getListWithPagination(
    paginationOptions: PaginationOptions,
    query?: string,
  );
}

export abstract class EmployeeRepository extends BaseRepository<EmployeeEntity> {
  abstract createWithUid(
    uid: string, // createdBy, updatedBy
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity>;

  abstract findWithRelational(
    options?: FindManyOptions<EmployeeEntity>,
    include?: Prisma.EmployeeInclude,
  ): Promise<Array<EmployeeEntity>>;
}
