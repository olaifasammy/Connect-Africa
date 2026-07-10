import { Permission } from './Permissions';

export class Role {
  constructor(public readonly name: string, public readonly permissions: Permission[]) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission);
  }
}

export const Roles = {
  USER: new Role('USER', [Permission.USER_READ, Permission.MFA_MANAGE]),
  ADMIN: new Role('ADMIN', Object.values(Permission)),
};
