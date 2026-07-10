import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UnbanUserCommand } from '../commands/UnbanUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserRestoredEvent } from '@modules/auth/domain/events/UserRestoredEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UnbanUserCommandHandler implements ICommandHandler<UnbanUserCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UnbanUserCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToUnban));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'UNBAN_USER',
        resource: command.userIdToUnban,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new UserRestoredEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'UNBAN_USER',
        resource: command.userIdToUnban,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to unban user');
    }
  }
}
