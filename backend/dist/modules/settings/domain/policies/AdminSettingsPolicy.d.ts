import { Role } from '../../../auth/public';
export declare class AdminSettingsPolicy {
    static isAuthorized(role: Role, userId: string): boolean;
}
