import type { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { ErrorCode } from '../../enums';
import { AppError } from '../../errors';
import { DI } from '../../providers';
import { excludeFields, randomStringGenerator } from '../../utils';
import type { JwtService } from '../jwt';
import { Role } from '../role';
import type { UserService } from '../user';
import { AuthProviders } from './auth-providers.enum';
import type { AuthEmailLoginDto, AuthRegisterDto } from './dto';

export class AuthService {
  private prisma: PrismaClient;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.prisma = DI.instance.prismaService;
  }

  async validateLogin(loginDto: AuthEmailLoginDto, onlyAdmin: boolean) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (
      !user ||
      (user && !(onlyAdmin ? [Role.Admin] : [Role.User]).includes(user.roleId))
    ) {
      throw new AppError(StatusCodes.NOT_FOUND, [
        {
          key: 'user',
          message: `User Not Found`,
          code: ErrorCode.NotFound,
        },
      ]);
    }

    if (user.provider !== AuthProviders.Email) {
      throw new AppError(StatusCodes.BAD_REQUEST, [
        {
          key: 'sign-in provider',
          message: `Need sign-in via ${user.provider} provider`,
          code: ErrorCode.InvalidRequest,
        },
      ]);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AppError(StatusCodes.BAD_REQUEST, [
        {
          key: 'password',
          message: `Incorrect Password`,
          code: ErrorCode.InvalidField,
        },
      ]);
    }

    const token = this.jwtService.sign({
      id: user.id,
      roleId: user.roleId,
    });

    const userExcludedFields = excludeFields<User, keyof User>(user, [
      'password',
      'hash',
    ]);

    return { token, user: userExcludedFields };
  }

  async register(dto: AuthRegisterDto): Promise<User> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    return await this.userService.create({
      ...dto,
      hash,
    });
  }
}
