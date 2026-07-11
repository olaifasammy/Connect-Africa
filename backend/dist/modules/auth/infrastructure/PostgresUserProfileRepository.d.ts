import { Pool } from 'pg';
import { IUserProfileRepository } from '../domain/repositories/IUserProfileRepository';
import { UserProfile } from '../domain/entities/UserProfile';
import { UserProfileId } from '../domain/value-objects/UserProfileId';
export declare class PostgresUserProfileRepository implements IUserProfileRepository {
    private pool;
    constructor(pool: Pool);
    update(entity: UserProfile): Promise<void>;
    findById(id: UserProfileId): Promise<UserProfile | null>;
    save(entity: UserProfile): Promise<void>;
}
