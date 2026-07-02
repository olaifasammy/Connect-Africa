import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export interface ISessionRepository {
  createSession(userId: UniqueEntityId, token: string): Promise<void>;
  invalidateSession(token: string): Promise<void>;
}
