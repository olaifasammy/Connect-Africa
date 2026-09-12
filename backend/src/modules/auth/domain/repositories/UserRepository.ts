import { User } from '../entities/User';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IUserRepository {
  save(user: User): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
  findById(id: UniqueEntityId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  search(term: string): Promise<User[]>;
}
