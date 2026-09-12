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
  DisableAccountCommand,
} from '../commands/DisableAccountCommand';

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
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

import {
  UserDisabledEvent,
} from '@modules/auth/domain/events/UserDisabledEvent';

@provide(
  DisableAccountCommandHandler,
  true,
)
@injectable()
export class DisableAccountCommandHandler
  implements
    ICommandHandler<
      DisableAccountCommand,
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
    command: DisableAccountCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userId,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.DISABLED
      ) {
        throw new AuthenticationError(
          'Account is already disabled.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.BANNED
      ) {
        throw new AuthenticationError(
          'Banned accounts cannot be disabled.',
        );
      }

      user.disable();

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository
        .revokeAllUserSessions(
          new UniqueEntityId(
            command.userId,
          ),
        );

      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'DISABLE_ACCOUNT',
        resource:
          command.userId,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new UserDisabledEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'DISABLE_ACCOUNT',
        resource:
          command.userId,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to disable account.',
          );
    }
  }
}
