import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '~/modules/users/model/user.entity';
import { UserMapper } from '~/modules/users/users.mapper';
import { ROLES } from '~/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Check if the user has roles to access the resource
   * @param context {ExecutionContext}
   * @returns{boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());

    if (!roles?.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return this.matchRoles(roles, user);
  }

  /**
   * Verifies roles match the user's roles
   * @param roles {string[]}
   * @param user {UserEntity}
   * @returns {boolean}
   */
  async matchRoles(roles: string[], user: UserEntity): Promise<boolean> {
    const { roles: userRoles } = await UserMapper.toDto(user, {
      roles: true,
    });

    const allUserRolesNames = userRoles?.map((role) => role.name);

    return roles.some((role) => allUserRolesNames?.includes(role));
  }
}
