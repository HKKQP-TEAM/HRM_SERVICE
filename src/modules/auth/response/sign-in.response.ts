import type { UserEntity } from '~/modules/user';

export interface SignInResponse {
  accessToken: string;
  user: Partial<UserEntity>;
}
