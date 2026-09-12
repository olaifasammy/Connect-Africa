import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  IQueryHandler,
} from '@shared/application/handlers/IQueryHandler';

import {
  GetUserSessionsQuery,
} from '@modules/auth/application/queries/GetUserSessionsQuery';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

@provide(
  GetUserSessionsQueryHandler,
  true,
)
@injectable()
export class GetUserSessionsQueryHandler
  implements
    IQueryHandler<
      GetUserSessionsQuery,
      string[]
    >
{
  constructor(
    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,
  ) {}

  async handle(
    query: GetUserSessionsQuery,
  ): Promise<string[]> {
    try {
      const sessions =
        await this.sessionRepository.listUserSessions(
          new UniqueEntityId(
            query.userId,
          ),
        );

      AuditLogger.log({
        user: query.userId,
        action: 'GET_USER_SESSIONS',
        resource: 'SESSION',
        status: 'SUCCESS',
        ipAddress: query.ipAddress,
      });

      return sessions;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_USER_SESSIONS',
        resource: 'SESSION',
        status: 'FAILURE',
        ipAddress: query.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to get user sessions',
          );
    }
  }
}
