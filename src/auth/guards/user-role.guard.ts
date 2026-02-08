import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!roles || roles.length === 0) return true;
    const user = context.switchToHttp().getRequest().user;
    for (const role of user.roles) {
      if (roles.includes(role)) return true;
    }
    throw new ForbiddenException(`User needs roles: [${roles}]`);
  }
}
