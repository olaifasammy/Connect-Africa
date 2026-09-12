import {
  provide,
} from 'inversify-binding-decorators';

import {
  injectable,
  inject,
} from 'inversify';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  DeleteAccountCommand,
} from '../commands/DeleteAccountCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

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
  UserDeletedEvent,
} from '@modules/auth/domain/events/UserDeletedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

@provide(
  DeleteAccountCommandHandler,
  true,
)
@injectable()
export class DeleteAccountCommandHandler
  implements
    ICommandHandler<
      DeleteAccountCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: DeleteAccountCommand,
  ): Promise<void> {
    const userId =
      new UniqueEntityId(
        command.userId,
      );

    try {
      const user =
        await this.userRepository.findById(
          userId,
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found',
        );
      }

      await this.sessionRepository
        .revokeAllUserSessions(
          userId,
        );

      await this.userRepository.delete(
        userId,
      );

      AuditLogger.log({
        user: command.userId,
        action: 'DELETE_ACCOUNT',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress,
      });

      await this.eventBus.publish(
        new UserDeletedEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'DELETE_ACCOUNT',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to delete account',
          );
    }
  }
}
