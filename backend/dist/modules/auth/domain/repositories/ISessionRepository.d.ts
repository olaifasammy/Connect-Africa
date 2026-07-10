import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface ISessionRepository {
    createSession(userId: UniqueEntityId, token: string): Promise<void>;
    invalidateSession(token: string): Promise<void>;
}
