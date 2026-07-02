import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';

export class AuthenticationService {
  constructor(private passwordHasher: IPasswordHasher) {}

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await this.passwordHasher.compare(password, user.passwordHash.value);
  }
}
