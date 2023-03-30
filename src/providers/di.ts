import { PrismaClient } from '@prisma/client';

import { ConfigService, JwtService } from '~/core';
import { MailService } from '~/core/providers/mail';
import type { AuthService } from '~/modules/auth';
import { AuthServiceIml } from '~/modules/auth';
import type { EmployeeRepository, EmployeeService } from '~/modules/employee';
import { EmployeeRepositoryImpl, EmployeeServiceIml } from '~/modules/employee';
import type { UserRepository, UserService } from '~/modules/user';
import { UserRepositoryIml, UserServiceImpl } from '~/modules/user';

// ********************************************

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

  get mailService(): MailService {
    return new MailService(this.configService);
  }

  get employeeService(): EmployeeService {
    return new EmployeeServiceIml(this.employeeRepository, this.mailService);
  }

  // *********** REPOSITORIES ***********
  get userRepository(): UserRepository {
    return new UserRepositoryIml();
  }

  get employeeRepository(): EmployeeRepository {
    return new EmployeeRepositoryImpl();
  }
}
