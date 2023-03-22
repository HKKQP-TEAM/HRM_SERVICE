import { UserRole } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers';

import { DI } from '~/providers';

import { CreateEmployeeDto } from './dto';
import type { EmployeeService } from './employee.interface';

@JsonController('/employees')
@Authorized([UserRole.Manager, UserRole.Admin])
export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = DI.instance.employeeService;
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  sendInvitation(
    @Body({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      },
    })
    createEmployee: CreateEmployeeDto,
  ) {
    return this.employeeService.create(createEmployee);
  }
}
