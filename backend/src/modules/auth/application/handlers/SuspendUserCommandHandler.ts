import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { SuspendUserCommand } from '../commands/SuspendUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AdminPolicy } from '@modules/auth/domain/policies/rbac/AdminPolicy';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserSuspendedEvent } from '@modules/auth/domain/events/UserSuspendedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SuspendUserCommandHandler implements ICommandHandler<SuspendUserCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: SuspendUserCommand): Promise<void> {
    try {
      // Admin policy enforcement would be checked here
      
      const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToSuspend));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Assuming User entity would have a method: user.suspend();
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'SUSPEND_USER',
        resource: command.userIdToSuspend,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new UserSuspendedEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'SUSPEND_USER',
        resource: command.userIdToSuspend,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to suspend user');
    }
  }
}
