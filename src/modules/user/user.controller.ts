import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParam,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '../../providers';
import { infinityPagination } from '../../utils';
import { Role } from '../role';
import { CreateUserDto, UpdateUserDto } from './dto';
import type { UserService } from './user.service';

@JsonController('/users/')
@Authorized([Role.Admin])
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

  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll(
    @QueryParam('limit', { required: true }) limit: number,
    @QueryParam('page', { required: true }) page: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto) {
    return this.userService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
