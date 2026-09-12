import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ResetPasswordCommand } from '../commands/ResetPasswordCommand';

import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';

import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { PasswordResetEvent } from '@modules/auth/domain/events/PasswordResetEvent';

import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';

@provide(
  ResetPasswordCommandHandler,
  true,
)
@injectable()
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand, void>
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,

    @inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,

    @inject('IJwtProvider')
    private readonly jwtProvider: IJwtProvider,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: ResetPasswordCommand,
  ): Promise<void> {
    try {
      const userIdFromToken =
        this.jwtProvider.verifyToken(
          command.resetToken,
          'PASSWORD_RESET',
        );

      const user =
        await this.userRepository.findByEmail(
          command.email,
        );

      if (!user) {
        throw new AuthenticationError(
          'Invalid password reset request.',
        );
      }

      if (
        user.id.toString() !==
        userIdFromToken
      ) {
        throw new AuthenticationError(
          'Invalid password reset token.',
        );
      }

      const hashedPassword =
        await this.passwordHasher.hash(
          command.newPassword,
        );

      user.updatePassword(
        new PasswordHash(
          hashedPassword,
        ),
      );

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository.revokeAllUserSessions(
        user.id,
      );

      AuditLogger.log({
        user:
          user.id.toString(),
        action:
          'RESET_PASSWORD',
        resource:
          'AUTH',
        status:
          'SUCCESS',
        ipAddress:
          command.ipAddress,
      });

      await this.eventBus.publish(
        new PasswordResetEvent(
          user.id,
        ),
      );
    } catch (error) {
      AuditLogger.log({
        user:
          command.email,
        action:
          'RESET_PASSWORD',
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
        'Failed to reset password.',
      );
    }
  }
}
