import { AdminPolicy, Role } from '@modules/auth/public';

export class AdminSettingsPolicy {
  static isAuthorized(role: Role, userId: string): boolean {
    try {
      AdminPolicy.isAdmin(role, userId);
      return true;
    } catch {
      return false;
    }
  }
}
