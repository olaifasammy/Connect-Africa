import {
  inject,
  injectable,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  ForceLogoutCommand,
} from '../commands/ForceLogoutCommand';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  SessionRevokedEvent,
} from '@modules/auth/domain/events/SessionRevokedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

@provide(
  ForceLogoutCommandHandler,
  true,
)
@injectable()
export class ForceLogoutCommandHandler
  implements
    ICommandHandler<
      ForceLogoutCommand,
      void
    >
{
  constructor(
    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: ForceLogoutCommand,
  ): Promise<void> {
    try {
      const userId =
        new UniqueEntityId(
          command.userId,
        );

      await this.sessionRepository.revokeAllUserSessions(
        userId,
      );

      AuditLogger.log({
        user: command.adminUserId,
        action: 'FORCE_LOGOUT',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress,
      });

      await this.eventBus.publish(
        new SessionRevokedEvent(
          userId,
          'ALL',
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'FORCE_LOGOUT',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to force logout',
          );
    }
  }
}
