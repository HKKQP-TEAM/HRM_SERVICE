import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '~/providers';

import type { AuthService } from './auth.interface';
import { SignInDto } from './dto';
import type { SignInResponse } from './response';

// ********************************************

@JsonController('/auth')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = DI.instance.authService;
  }

  @Post('/sign-in')
  @HttpCode(StatusCodes.OK)
  public signIn(@Body() loginDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(loginDto);
  }

  @Authorized()
  @Get('/me')
  @HttpCode(StatusCodes.OK)
  public me() {
    // return this.authService.me(request.user);
  }
}
