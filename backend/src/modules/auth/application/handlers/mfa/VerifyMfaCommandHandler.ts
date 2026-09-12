import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { VerifyMfaCommand } from '@modules/auth/application/commands/VerifyMfaCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IMfaEnrollmentRepository } from '@modules/auth/domain/repositories/IMfaEnrollmentRepository';
import { ITotpProvider } from '@modules/auth/domain/interfaces/ITotpProvider';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { MfaEnabledEvent } from '@modules/auth/domain/events/MfaEnabledEvent';
import { AuditLogRequestedEvent } from '@modules/audit/public';

@provide(VerifyMfaCommandHandler, true)
@injectable()
export class VerifyMfaCommandHandler implements ICommandHandler<VerifyMfaCommand, void> {
  constructor(
    @inject('IUserRepository') private readonly userRepository: IUserRepository,
    @inject('IMfaEnrollmentRepository') private readonly enrollmentRepository: IMfaEnrollmentRepository,
    @inject('ITotpProvider') private readonly totpProvider: ITotpProvider,
    @inject('ISessionRepository') private readonly sessionRepository: ISessionRepository,
    @inject('EventBus') private readonly eventBus: EventBus,
  ) {}

  async handle(command: VerifyMfaCommand): Promise<void> {
    const userId = new UniqueEntityId(command.userId);

    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (user.mfaSecret) {
        throw new AuthenticationError('MFA is already enabled');
      }

      const pendingSecret = await this.enrollmentRepository.get(userId);

      if (!pendingSecret) {
        throw new AuthenticationError('No pending MFA enrollment found');
      }

      if (!/^\d{6}$/.test(command.code)) {
        throw new AuthenticationError('Invalid MFA code');
      }

      const valid = this.totpProvider.verifyCode(pendingSecret, command.code);

      if (!valid) {
        throw new AuthenticationError('Invalid MFA code');
      }

      user.setMfaSecret(pendingSecret);

      await this.userRepository.save(user);
      await this.enrollmentRepository.remove(userId);
      await this.sessionRepository.revokeAllUserSessions(userId);

      await this.eventBus.publish(new MfaEnabledEvent(userId));

      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'VERIFY_MFA',
          actorId: command.userId,
          actorType: 'USER',
          resourceId: command.userId,
          resourceType: 'AUTH',
          ipAddress: command.ipAddress || '',
          userAgent: command.userAgent || '',
          metadata: [{ key: 'status', value: 'SUCCESS' }],
        }),
      );
    } catch (error) {
      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'VERIFY_MFA',
          actorId: command.userId,
          actorType: 'USER',
          resourceId: command.userId,
          resourceType: 'AUTH',
          ipAddress: command.ipAddress || '',
          userAgent: command.userAgent || '',
          metadata: [{ key: 'status', value: 'FAILURE' }],
        }),
      );

      if (error instanceof AuthenticationError) {
        throw error;
      }

      throw new AuthenticationError('Failed to verify MFA');
    }
  }
}
