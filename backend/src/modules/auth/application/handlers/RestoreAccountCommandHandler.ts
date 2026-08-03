import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RestoreAccountCommand } from '../commands/RestoreAccountCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserRestoredEvent } from '@modules/auth/domain/events/UserRestoredEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RestoreAccountCommandHandler implements ICommandHandler<RestoreAccountCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: RestoreAccountCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Assuming User entity would have a method: user.restore();
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.userId,
        action: 'RESTORE_ACCOUNT',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new UserRestoredEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'RESTORE_ACCOUNT',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to restore account');
    }
  }
}
