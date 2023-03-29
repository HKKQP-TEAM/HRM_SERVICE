import type { UserRole } from '@prisma/client';

export type JwtPayload = {
  uid: string;
  role: UserRole;
  iat: number;
  exp: number;
};
