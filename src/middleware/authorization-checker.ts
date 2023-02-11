import type { Action } from 'routing-controllers';
import { UnauthorizedError } from 'routing-controllers';

import type { JwtPayload } from '../modules/jwt';
import type { Role } from '../modules/role';
import { DI } from '../providers';

export function authorizationChecker(action: Action, roles: Array<Role>) {
  try {
    const authorization = action.request.headers.authorization;
    const token = authorization.replace(/^Bearer\s+/, '');
    const user = DI.instance.jwtService.verify<JwtPayload>(token);

    if (roles.length === 0) {
      return true;
    }

    return roles.includes(user.roleId);
  } catch {
    throw new UnauthorizedError();
  }
}
