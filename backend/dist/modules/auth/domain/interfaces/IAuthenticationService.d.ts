import { User } from '../entities/User';
export interface IAuthenticationService {
    verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean>;
}
