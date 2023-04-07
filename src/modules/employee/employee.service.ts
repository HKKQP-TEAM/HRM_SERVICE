import type { MailService, PaginationOptions } from '~/core';
import {
  BadRequestException,
  infinityPagination,
  parsePagination,
} from '~/core';

import type { CreateEmployeeDto } from './dto';
import type { EmployeeRepository, EmployeeService } from './employee.interface';
import type { EmployeeEntity } from './entities';

export class EmployeeServiceIml implements EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly mailService: MailService,
  ) {}

  async create(
    uid: string,
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneBy({
      email: createEmployeeDto.email,
    });

    if (employee)
      throw new BadRequestException('Employee', 'Employee already existed!!!');

    // send mail
    void this.mailService
      .sendEmployeeInvitation({
        to: 'axnguyen.it@gmail.com',
        data: { websiteUrl: 'string' },
      })
      .then()
      .catch();

    return this.employeeRepository.createWithUid(uid, createEmployeeDto);
  }

  async getListWithPagination(
    paginationOptions: PaginationOptions,
    _query?: string,
  ) {
    const pagination = parsePagination(paginationOptions);
    const count = await this.employeeRepository.count();
    const employees = await this.employeeRepository.findWithRelational(
      {
        skip: (pagination.currentPage - 1) * pagination.limit,
        take: pagination.limit,
      },
      {
        department: true,
        contact: true,
        role: true,
        jobs: true,
        salaries: true,
        totalSalaries: true,
        workingTime: true,
      },
    );

    return infinityPagination(employees, pagination, count);
  }
}
