import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ActivateAccountCommand } from '../commands/ActivateAccountCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AccountActivatedEvent } from '@modules/auth/domain/events/AccountActivatedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ActivateAccountCommandHandler implements ICommandHandler<ActivateAccountCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: ActivateAccountCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      
      user.activate();
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.userId,
        action: 'ACTIVATE_ACCOUNT',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new AccountActivatedEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'ACTIVATE_ACCOUNT',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to activate account');
    }
  }
}
