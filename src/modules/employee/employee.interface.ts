import { BaseRepository } from '~/core';

import type { CreateEmployeeDto } from './dto';
import type { EmployeeEntity } from './entities';

export abstract class EmployeeService {
  abstract create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity>;
}

export abstract class EmployeeRepository extends BaseRepository<EmployeeEntity> {}
