import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { ITotpProvider } from '@modules/auth/domain/interfaces/ITotpProvider';
import { IMfaEnrollmentRepository } from '@modules/auth/domain/repositories/IMfaEnrollmentRepository';
import { MfaPolicy } from '@modules/auth/domain/policies/MfaPolicy';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export interface EnableMfaResult {
  readonly secret: string;
  readonly otpauthUrl: string;
}

export class EnableMfaCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}

@provide(EnableMfaCommandHandler, true)
@injectable()
export class EnableMfaCommandHandler implements ICommandHandler<EnableMfaCommand, EnableMfaResult> {
  constructor(
    @inject('IUserRepository') private readonly userRepository: IUserRepository,
    @inject('ITotpProvider') private readonly totpProvider: ITotpProvider,
    @inject('IMfaEnrollmentRepository') private readonly enrollmentRepository: IMfaEnrollmentRepository,
    @inject('EventBus') private readonly eventBus: EventBus,
  ) {}

  async handle(command: EnableMfaCommand): Promise<EnableMfaResult> {
    const userId = new UniqueEntityId(command.userId);

    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (!MfaPolicy.canEnableMfa(Boolean(user.mfaSecret))) {
        throw new AuthenticationError('MFA is already enabled');
      }

      const secret = this.totpProvider.generateSecret();
      const otpauthUrl = this.totpProvider.generateUrl(secret, user.email.value);

      await this.enrollmentRepository.save(userId, secret);

      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'ENABLE_MFA',
          actorId: command.userId,
          actorType: 'USER',
          resourceId: command.userId,
          resourceType: 'AUTH',
          ipAddress: command.ipAddress || '',
          userAgent: command.userAgent || '',
          metadata: [{ key: 'status', value: 'PENDING_VERIFICATION' }],
        }),
      );

      return {
        secret,
        otpauthUrl,
      };
    } catch (error) {
      await this.eventBus.publish(
        new AuditLogRequestedEvent({
          action: 'ENABLE_MFA',
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

      throw new AuthenticationError('Failed to start MFA enrollment');
    }
  }
}
