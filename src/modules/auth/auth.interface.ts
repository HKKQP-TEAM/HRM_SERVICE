import type { UserEntity } from '../user/entities';
import type { AuthEmailLoginDto } from './dto';

export interface AuthService {
  validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{
    token: string;
    user: Omit<UserEntity, keyof UserEntity>;
  }>;

  // register(dto: AuthRegisterDto): Promise<UserEntity>;
}
