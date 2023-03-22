import { StatusCodes } from 'http-status-codes';

import { ErrorCode } from '~/enums';
import { HttpException } from '~/exceptions';

import type { MailService } from '../mail';
import type { CreateEmployeeDto } from './dto';
import type { EmployeeRepository, EmployeeService } from './employee.interface';
import type { EmployeeEntity } from './entities';

export class EmployeeServiceIml implements EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly mailService: MailService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneBy({
      email: createEmployeeDto.email,
    });

    if (employee) {
      throw new HttpException(StatusCodes.CONFLICT, [
        {
          code: ErrorCode.ALREADY_EXISTED,
          key: 'Employee',
          message: 'Employee already existed!!!',
        },
      ]);
    }

    // send mail
    void this.mailService
      .sendEmployeeInvitation({
        to: 'axnguyen.it@gmail.com',
        data: { websiteUrl: 'string' },
      })
      .then()
      .catch();

    return this.employeeRepository.create(createEmployeeDto);
  }
}
