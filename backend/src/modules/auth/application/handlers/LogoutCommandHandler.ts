import { createHash } from 'crypto';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SessionRevokedEvent } from '@modules/auth/domain/events/SessionRevokedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class LogoutCommand implements ICommand {
  constructor(
    public readonly token: string,
    public readonly userId: string,
    public readonly ipAddress?: string,
  ) {}
}

@provide(LogoutCommandHandler, true)
@injectable()
export class LogoutCommandHandler
  implements ICommandHandler<LogoutCommand, void>
{
  constructor(
    @inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: LogoutCommand,
  ): Promise<void> {
    try {
      const userId =
        new UniqueEntityId(
          command.userId,
        );

      const sessionId =
        createHash('sha256')
          .update(command.token)
          .digest('hex');

      await this.sessionRepository.invalidateSession(
        userId,
        command.token,
      );

      AuditLogger.log({
        user: command.userId,
        action: 'LOGOUT',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress,
      });

      await this.eventBus.publish(
        new SessionRevokedEvent(
          userId,
          sessionId,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'LOGOUT',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to logout',
          );
    }
  }
}
