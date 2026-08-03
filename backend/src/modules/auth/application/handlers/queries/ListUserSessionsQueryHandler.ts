import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { ListUserSessionsQuery } from '@modules/auth/application/queries/ListUserSessionsQuery';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ListUserSessionsQueryHandler implements IQueryHandler<ListUserSessionsQuery, string[]> {
  constructor(private sessionRepository: ISessionRepository) {}

  async handle(query: ListUserSessionsQuery): Promise<string[]> {
    return await this.sessionRepository.listUserSessions(new UniqueEntityId(query.userId));
  }
}
