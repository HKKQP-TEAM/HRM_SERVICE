import type { UserRole } from '@prisma/client';
import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import type { JwtPayload } from '~/core';
import { DI } from '~/providers';

export function authorizationChecker(action: Action, roles: Array<UserRole>) {
  try {
    const authorization = action.request.headers.authorization;
    if (!authorization) return false;
    const token = authorization.replace(/^Bearer\s+/, '');
    const user = DI.instance.jwtService.verify<JwtPayload>(token);

    if (roles.length === 0) return true;

    return roles.includes(user.role);
  } catch (error) {
    throw new UnauthorizedError();
  }
}