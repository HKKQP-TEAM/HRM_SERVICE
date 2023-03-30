import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '~/providers';

import { CreateUserDto } from './dto';
import type { UserService } from './user.interface';

@JsonController('/users/')
@Authorized()
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = DI.instance.userService;
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createProfileDto: CreateUserDto) {
    return this.userService.create(createProfileDto);
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
