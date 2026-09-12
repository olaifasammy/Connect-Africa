import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ResetMfaCommand } from '../commands/ResetMfaCommand';

import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { IMfaEnrollmentRepository } from '@modules/auth/domain/repositories/IMfaEnrollmentRepository';

import { MfaPolicy } from '@modules/auth/domain/policies/MfaPolicy';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { MFADisabledEvent } from '@modules/auth/domain/events/MFADisabledEvent';

import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(
  ResetMfaCommandHandler,
  true,
)
@injectable()
export class ResetMfaCommandHandler
  implements ICommandHandler<ResetMfaCommand, void>
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,

    @inject('IMfaEnrollmentRepository')
    private readonly mfaEnrollmentRepository: IMfaEnrollmentRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  async handle(
    command: ResetMfaCommand,
  ): Promise<void> {
    const targetUserId =
      new UniqueEntityId(
        command.userId,
      );

    try {
      const user =
        await this.userRepository.findById(
          targetUserId,
        );

      if (!user) {
        throw new AuthenticationError(
          'User not found.',
        );
      }

      if (
        !MfaPolicy.canDisableMfa(
          Boolean(user.mfaSecret),
        )
      ) {
        throw new AuthenticationError(
          'MFA is not enabled.',
        );
      }

      await this.mfaEnrollmentRepository.remove(
        targetUserId,
      );

      user.clearMfaSecret();

      await this.userRepository.save(
        user,
      );

      await this.sessionRepository.revokeAllUserSessions(
        targetUserId,
      );

      await this.eventBus.publish(
        new MFADisabledEvent(
          targetUserId,
        ),
      );

      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'RESET_MFA',
          actorId: command.adminUserId,
          actorType: 'USER',
          resourceId: command.userId,
          resourceType: 'AUTH',
          ipAddress: command.ipAddress || '',
          userAgent: '',
          metadata: [
            {
              key: 'status',
              value: 'SUCCESS',
            },
          ],
        }),
      );
    } catch (error) {
      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'RESET_MFA',
          actorId: command.adminUserId,
          actorType: 'USER',
          resourceId: command.userId,
          resourceType: 'AUTH',
          ipAddress: command.ipAddress || '',
          userAgent: '',
          metadata: [
            {
              key: 'status',
              value: 'FAILURE',
            },
          ],
        }),
      );

      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to reset MFA.',
      );
    }
  }
}
