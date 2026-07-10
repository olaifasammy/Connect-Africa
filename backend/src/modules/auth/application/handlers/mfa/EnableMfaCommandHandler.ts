import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { ITotpProvider } from '@modules/auth/domain/interfaces/ITotpProvider';
import { MfaEnabledEvent } from '@modules/auth/domain/events/MfaEnabledEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class EnableMfaCommand implements ICommand {
  constructor(public readonly userId: string, public readonly ipAddress?: string) {}
}

export class EnableMfaCommandHandler implements ICommandHandler<EnableMfaCommand, { secret: string }> {
  constructor(
    private userRepository: IUserRepository,
    private totpProvider: ITotpProvider,
    private eventBus: EventBus
  ) {}

  async handle(command: EnableMfaCommand): Promise<{ secret: string }> {
    try {
      const secret = this.totpProvider.generateSecret();
      
      // Assume user repository update logic would go here
      
      AuditLogger.log({
        user: command.userId,
        action: 'ENABLE_MFA',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new MfaEnabledEvent(new UniqueEntityId(command.userId)));
      
      return { secret };
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'ENABLE_MFA',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw new AuthenticationError('Failed to enable MFA');
    }
  }
}
