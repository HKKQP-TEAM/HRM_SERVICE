import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import { UserRole } from '../enums';
import type { JwtPayload } from '../modules/jwt';
import { DI } from '../providers';
import { logger } from '../utils';

export function authorizationChecker(action: Action, roles: Array<UserRole>) {
  try {
    const authorization = action.request.headers.authorization;
    const token = authorization.replace(/^Bearer\s+/, '');
    const user = DI.instance.jwtService.verify<JwtPayload>(token);
    logger.info(user);
    logger.info(roles);

    if (roles.length === 0) {
      return true;
    }

    return roles.includes(UserRole[user.role]);
  } catch {
    throw new UnauthorizedError();
  }
}