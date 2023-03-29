import { UserRole } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  CurrentUser,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { JwtPayload } from '~/core';
import { DI } from '~/providers';

import { CreateEmployeeDto } from './dto';
import type { EmployeeService } from './employee.interface';

@JsonController('/employees')
@Authorized([UserRole.Manager, UserRole.Admin])
@OpenAPI({ security: [{ basicAuth: [] }] })
export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = DI.instance.employeeService;
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  sendInvitation(
    @CurrentUser() decodedJwt: JwtPayload,
    @Body({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      },
    })
    createEmployee: CreateEmployeeDto,
  ) {
    return this.employeeService.create(decodedJwt.uid, createEmployee);
  }
}
