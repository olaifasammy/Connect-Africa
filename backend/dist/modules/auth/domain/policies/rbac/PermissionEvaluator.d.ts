import { Role } from './Role';
import { Permission } from './Permissions';
export declare class PermissionEvaluator {
    static evaluate(role: Role, requiredPermission: Permission, userId: string): void;
}
