import { BadRequestException } from '~/core/exceptions';

import type { MailService } from '../../core/providers/mail';
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
}
