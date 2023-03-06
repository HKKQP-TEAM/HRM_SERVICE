import { PrismaClient } from '@prisma/client';

import type { AuthService } from '~/modules/auth';
import { AuthServiceIml } from '~/modules/auth';
import { JwtService } from '~/modules/jwt';
import { RoleService } from '~/modules/role';
import type { UserRepository, UserService } from '~/modules/user';
import { UserRepositoryIml, UserServiceImpl } from '~/modules/user';

import { ConfigService } from './config.service';

export class DI {
  private static singleton: DI;

  private constructor() {}

  public static get instance(): DI {
    if (!DI.singleton) {
      DI.singleton = new DI();
    }

    return DI.singleton;
  }

  get configService(): ConfigService {
    return new ConfigService();
  }

  get jwtService(): JwtService {
    return new JwtService({
      secret: this.configService.get<string>('AUTH_JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get<string>('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    });
  }

  get userService(): UserService {
    return new UserServiceImpl();
  }

  get authService(): AuthService {
    return new AuthServiceIml(this.userService, this.jwtService);
  }

  get prismaService(): PrismaClient {
    return new PrismaClient();
  }

  get roleService(): RoleService {
    return new RoleService();
  }

  //
  get userRepository(): UserRepository {
    return new UserRepositoryIml();
  }
}
