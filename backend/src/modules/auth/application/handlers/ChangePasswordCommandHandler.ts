import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  ChangePasswordCommand,
} from '../commands/ChangePasswordCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  IPasswordHasher,
} from '@modules/auth/domain/interfaces/IPasswordHasher';

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
  PasswordChangedEvent,
} from '@modules/auth/domain/events/PasswordChangedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  PasswordHash,
} from '@modules/auth/domain/value-objects/PasswordHash';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

@provide(
  ChangePasswordCommandHandler,
  true,
)
@injectable()
export class ChangePasswordCommandHandler
  implements
    ICommandHandler<
      ChangePasswordCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('IPasswordHasher')
    private readonly passwordHasher:
      IPasswordHasher,

    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: ChangePasswordCommand,
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

      const isPasswordValid =
        await this.passwordHasher.compare(
          command.currentPassword,
          user.passwordHash.value,
        );

      if (!isPasswordValid) {
        throw new AuthenticationError(
          'Invalid current password.',
        );
      }

      const newPasswordHash =
        await this.passwordHasher.hash(
          command.newPassword,
        );

      user.updatePassword(
        new PasswordHash(
          newPasswordHash,
        ),
      );

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
          command.userId,
        action:
          'CHANGE_PASSWORD',
        resource:
          'AUTH',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new PasswordChangedEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.userId,
        action:
          'CHANGE_PASSWORD',
        resource:
          'AUTH',
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to change password.',
      );
    }
  }
}
