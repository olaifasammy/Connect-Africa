import { Role } from './Role';
export declare class AdminPolicy {
    static isAdmin(role: Role, userId: string): void;
}
