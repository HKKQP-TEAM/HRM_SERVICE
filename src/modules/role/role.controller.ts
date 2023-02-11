import { StatusCodes } from 'http-status-codes';
import { Authorized, Get, HttpCode, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '../../providers';
import { Role } from './role.enum';
import type { RoleService } from './role.service';

@JsonController('/roles/')
@Authorized([Role.Admin])
@OpenAPI({ security: [{ basicAuth: [] }] })
export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = DI.instance.roleService;
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  findAll() {
    return this.roleService.findAll();
  }
}
