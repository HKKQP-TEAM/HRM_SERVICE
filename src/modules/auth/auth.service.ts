import type { JwtService } from '~/core';
import { BcryptHelper } from '~/core';
import { BadRequestException, NotFoundException } from '~/core/exceptions';
import type { UserEntity, UserService } from '~/modules/user';

import type { AuthService } from './auth.interface';
import type { SignInDto } from './dto';
import type { SignInResponse } from './response';

export class AuthServiceIml implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponse> {
    const { username, password } = data;
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User', 'User not found');
    const isValidPassword = await BcryptHelper.verifyHash(
      password,
      user.password,
    );

    if (!isValidPassword)
      throw new NotFoundException('User', 'Invalid password');

    if (!user.emailVerifiedAt)
      throw new BadRequestException('User', 'User is disabled');

    const accessToken = this.jwtService.sign({ uid: user.id, role: user.role });

    return { accessToken, user };
  }

  async me(uid: string): Promise<Omit<UserEntity, keyof UserEntity>> {
    return await this.userService.findById(uid);
  }
}
