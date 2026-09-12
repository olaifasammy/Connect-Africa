import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  BanUserCommand,
} from '../commands/BanUserCommand';

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
  UserBannedEvent,
} from '@modules/auth/domain/events/UserBannedEvent';

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
  BanUserCommandHandler,
  true,
)
@injectable()
export class BanUserCommandHandler
  implements
    ICommandHandler<
      BanUserCommand,
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
    command: BanUserCommand,
  ): Promise<void> {
    try {
      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userIdToBan,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.BANNED
      ) {
        throw new AuthenticationError(
          'Account is already banned.',
        );
      }

      if (
        user.accountStatus ===
        AccountStatus.PENDING_VERIFICATION
      ) {
        throw new AuthenticationError(
          'Unverified accounts cannot be banned.',
        );
      }

      user.ban();

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository
        .revokeAllUserSessions(
          new UniqueEntityId(
            command.userIdToBan,
          ),
        );

      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'BAN_USER',
        resource:
          command.userIdToBan,
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new UserBannedEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.adminUserId,
        action:
          'BAN_USER',
        resource:
          command.userIdToBan,
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to ban user.',
          );
    }
  }
}
