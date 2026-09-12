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
  SuspendUserCommand,
} from '../commands/SuspendUserCommand';

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
  UserSuspendedEvent,
} from '@modules/auth/domain/events/UserSuspendedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

@provide(
  SuspendUserCommandHandler,
  true,
)
@injectable()
export class SuspendUserCommandHandler
  implements
    ICommandHandler<
      SuspendUserCommand,
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
    command: SuspendUserCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userIdToSuspend,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.SUSPENDED
      ) {
        throw new AuthenticationError(
          'Account is already suspended.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.BANNED
      ) {
        throw new AuthenticationError(
          'Banned accounts cannot be suspended.',
        );
      }

      user.suspend();

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository
        .revokeAllUserSessions(
          new UniqueEntityId(
            command.userIdToSuspend,
          ),
        );

      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'SUSPEND_USER',
        resource:
          command.userIdToSuspend,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new UserSuspendedEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'SUSPEND_USER',
        resource:
          command.userIdToSuspend,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to suspend user.',
          );
    }
  }
}
