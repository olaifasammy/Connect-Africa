import { User } from '../entities/User';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: UniqueEntityId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
