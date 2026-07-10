import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { AssignRoleCommand } from '../commands/AssignRoleCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { RoleAssignedEvent } from '@modules/auth/domain/events/RoleAssignedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class AssignRoleCommandHandler implements ICommandHandler<AssignRoleCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: AssignRoleCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Logic to update user roles
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'ASSIGN_ROLE',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new RoleAssignedEvent(user.id, command.role));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'ASSIGN_ROLE',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to assign role');
    }
  }
}
