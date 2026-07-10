import Redis from 'ioredis';
import { ISessionRepository } from '../../auth/domain/repositories/ISessionRepository';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
export declare class RedisSessionRepository implements ISessionRepository {
    private redisClient;
    constructor(redisClient: Redis);
    createSession(userId: UniqueEntityId, token: string): Promise<void>;
    invalidateSession(token: string): Promise<void>;
}
