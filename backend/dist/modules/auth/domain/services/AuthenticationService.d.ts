import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
import { IAuditLogger } from '../interfaces/IAuditLogger';
import { IAuthenticationService } from '../interfaces/IAuthenticationService';
export declare class AuthenticationService implements IAuthenticationService {
    private passwordHasher;
    private auditLogger;
    constructor(passwordHasher: IPasswordHasher, auditLogger: IAuditLogger);
    verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean>;
}
