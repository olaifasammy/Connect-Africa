import { Pool } from 'pg';
import { IUserRepository } from '../../auth/domain/repositories/UserRepository';
import { User } from '../../auth/domain/entities/User';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
export declare class PostgresUserRepository implements IUserRepository {
    private pool;
    constructor(pool: Pool);
    save(user: User): Promise<void>;
    findById(id: UniqueEntityId): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    search(term: string): Promise<User[]>;
}
