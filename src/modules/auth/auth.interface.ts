import type { UserEntity } from '../user';
import type { SignInDto } from './dto';
import type { SignInResponse } from './response';

export abstract class AuthService {
  abstract signIn(body: SignInDto): Promise<SignInResponse>;

  abstract me(uid: string): Promise<Omit<UserEntity, keyof UserEntity>>;
}
