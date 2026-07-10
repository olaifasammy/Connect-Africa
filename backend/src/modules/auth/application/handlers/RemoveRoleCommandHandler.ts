import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RemoveRoleCommand } from '../commands/RemoveRoleCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { RoleRemovedEvent } from '@modules/auth/domain/events/RoleRemovedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RemoveRoleCommandHandler implements ICommandHandler<RemoveRoleCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: RemoveRoleCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Logic to update user roles
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'REMOVE_ROLE',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new RoleRemovedEvent(user.id, command.role));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'REMOVE_ROLE',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to remove role');
    }
  }
}
