import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
import { IAuditLogger } from '../interfaces/IAuditLogger';
export declare class AuthenticationService {
    private passwordHasher;
    private auditLogger;
    constructor(passwordHasher: IPasswordHasher, auditLogger: IAuditLogger);
    verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean>;
}
