import { Permission } from './Permissions';
export declare class Role {
    readonly name: string;
    readonly permissions: Permission[];
    constructor(name: string, permissions: Permission[]);
    hasPermission(permission: Permission): boolean;
}
export declare const Roles: {
    USER: Role;
    ADMIN: Role;
};
