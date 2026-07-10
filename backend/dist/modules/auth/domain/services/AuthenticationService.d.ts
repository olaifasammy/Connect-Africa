import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
export declare class AuthenticationService {
    private passwordHasher;
    constructor(passwordHasher: IPasswordHasher);
    verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean>;
}
