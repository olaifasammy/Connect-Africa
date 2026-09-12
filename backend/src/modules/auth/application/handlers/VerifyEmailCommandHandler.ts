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
  VerifyEmailCommand,
} from '../commands/VerifyEmailCommand';

import {
  IUserRepository,
} from '@modules/auth/domain/repositories/UserRepository';

import {
  IJwtProvider,
} from '@modules/auth/domain/interfaces/IJwtProvider';

import {
  AuditLogger,
} from '@modules/auth/infrastructure/AuditLogger';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  EmailVerifiedEvent,
} from '@modules/auth/domain/events/EmailVerifiedEvent';

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
  VerifyEmailCommandHandler,
  true,
)
@injectable()
export class VerifyEmailCommandHandler
  implements
    ICommandHandler<
      VerifyEmailCommand,
      void
    >
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository:
      IUserRepository,

    @inject('IJwtProvider')
    private readonly jwtProvider:
      IJwtProvider,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: VerifyEmailCommand,
  ): Promise<void> {
    try {
      const userIdFromToken =
        this.jwtProvider.verifyToken(
          command.token,
          'EMAIL_VERIFICATION',
        );

      if (
        command.userId !==
        userIdFromToken
      ) {
        throw new AuthenticationError(
          'Invalid verification token.',
        );
      }

      const user =
        await this.userRepository.findById(
          new UniqueEntityId(
            command.userId,
          ),
        );

      if (!user) {
        throw new AuthenticationError(
          'Invalid verification request.',
        );
      }

      if (
        user.accountStatus ===
          AccountStatus.BANNED ||
        user.accountStatus ===
          AccountStatus.SUSPENDED ||
        user.accountStatus ===
          AccountStatus.DISABLED
      ) {
        throw new AuthenticationError(
          'Account cannot be activated through email verification.',
        );
      }

      const wasVerified =
        user.isEmailVerified();

      user.verifyEmail();

      /*
       * Email verification and account activation are
       * separate lifecycle operations.
       *
       * A pending account becomes active only when it
       * has completed email verification.
       */
      if (
        user.accountStatus ===
        AccountStatus.PENDING_VERIFICATION
      ) {
        user.activate();
      }

      await this.userRepository.save(
        user,
      );

      AuditLogger.log({
        user:
          command.userId,
        action:
          'VERIFY_EMAIL',
        resource:
          'AUTH',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      if (!wasVerified) {
        await this.eventBus.publish(
          new EmailVerifiedEvent(
            user.id,
          ),
        );
      }
    } catch (error) {
      AuditLogger.log({
        user:
          command.userId,
        action:
          'VERIFY_EMAIL',
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
        'Failed to verify email.',
      );
    }
  }
}
