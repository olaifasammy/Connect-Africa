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
  UnbanUserCommand,
} from '../commands/UnbanUserCommand';

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
  UserRestoredEvent,
} from '@modules/auth/domain/events/UserRestoredEvent';

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
  UnbanUserCommandHandler,
  true,
)
@injectable()
export class UnbanUserCommandHandler
  implements
    ICommandHandler<
      UnbanUserCommand,
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
    command: UnbanUserCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userIdToUnban,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.ACTIVE
      ) {
        throw new AuthenticationError(
          'User account is already active.',
        );
      }

      if (
        user.accountStatus !==
        AccountStatus.BANNED
      ) {
        throw new AuthenticationError(
          'Only banned accounts can be unbanned.',
        );
      }

      user.activate();

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository
        .revokeAllUserSessions(
          new UniqueEntityId(
            command.userIdToUnban,
          ),
        );

      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'UNBAN_USER',
        resource:
          command.userIdToUnban,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new UserRestoredEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'UNBAN_USER',
        resource:
          command.userIdToUnban,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to unban user.',
          );
    }
  }
}
