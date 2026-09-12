import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface ISessionRepository {
  createSession(
    userId: UniqueEntityId,
    token: string,
  ): Promise<void>;

  getSessionUserId(
    token: string,
  ): Promise<UniqueEntityId | null>;

  rotateSession(
    userId: UniqueEntityId,
    oldToken: string,
    newToken: string,
  ): Promise<void>;

  invalidateSession(
    userId: UniqueEntityId,
    token: string,
  ): Promise<void>;

  invalidateSessionById(
    userId: UniqueEntityId,
    sessionId: string,
  ): Promise<void>;

  listUserSessions(
    userId: UniqueEntityId,
  ): Promise<string[]>;

  revokeAllUserSessions(
    userId: UniqueEntityId,
  ): Promise<void>;
}
