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
  ChangeEmailCommand,
} from '../commands/ChangeEmailCommand';

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
  EmailChangedEvent,
} from '@modules/auth/domain/events/EmailChangedEvent';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

import {
  Email,
} from '@modules/auth/domain/value-objects/Email';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

@provide(
  ChangeEmailCommandHandler,
  true,
)
@injectable()
export class ChangeEmailCommandHandler
  implements
    ICommandHandler<
      ChangeEmailCommand,
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
    command: ChangeEmailCommand,
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

      const newEmail =
        new Email(
          command.newEmail,
        );

      if (
        newEmail.value ===
        user.email.value
      ) {
        throw new AuthenticationError(
          'New email must differ from the current email.',
        );
      }

      const existingUser =
        await this.userRepository.findByEmail(
          newEmail.value,
        );

      if (
        existingUser &&
        existingUser.id.toString() !==
          user.id.toString()
      ) {
        throw new AuthenticationError(
          'Email already taken.',
        );
      }

      user.updateEmail(
        newEmail,
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
          'CHANGE_EMAIL',
        resource:
          'AUTH',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new EmailChangedEvent(
          user.id,
          newEmail.value,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.userId,
        action:
          'CHANGE_EMAIL',
        resource:
          'AUTH',
        status:
          'FAILURE',
        ipAddress:
          command.ipAddress,
      });

      throw error instanceof
        AuthenticationError
        ? error
        : new AuthenticationError(
            'Failed to change email.',
          );
    }
  }
}
