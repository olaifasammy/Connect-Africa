import { ICommandHandler } from '../ICommandHandler';
import { ICommand } from '../../commands/ICommand';
import { IUserRepository } from '@domain/auth/repositories/UserRepository';
import { ITotpProvider } from '@domain/auth/interfaces/ITotpProvider';
import { MfaEnabledEvent } from '@domain/auth/events/MfaEnabledEvent';
import { EventBus } from '@infrastructure/queue/EventBus';
import { PostgresAuditRepository } from '@infrastructure/repositories/audit/PostgresAuditRepository';

export class EnableMfaCommand implements ICommand {
  constructor(public readonly userId: string) {}
}

export class EnableMfaCommandHandler implements ICommandHandler<EnableMfaCommand, { secret: string }> {
  constructor(
    private userRepository: IUserRepository,
    private totpProvider: ITotpProvider,
    private auditRepository: PostgresAuditRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: EnableMfaCommand): Promise<{ secret: string }> {
    const secret = this.totpProvider.generateSecret();
    // Implementation would update user and save secret
    await this.auditRepository.log({ user: command.userId, action: 'ENABLE_MFA', resource: 'AUTH', status: 'SUCCESS' });
    return { secret };
  }
}
