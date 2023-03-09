import type { UserService } from '~/modules/user';

import type { AuthService } from './auth.interface';
import type { AuthEmailLoginDto } from './dto';

export class AuthServiceIml implements AuthService {
  constructor(private readonly userService: UserService) {}

  async validateLogin(loginDto: AuthEmailLoginDto, _: boolean) {
    await this.userService.findByEmail(loginDto.email);

    return { token: '', user: 'userExcludedFields' };
  }
}
