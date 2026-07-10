import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { BanUserCommand } from '../commands/BanUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AdminPolicy } from '@modules/auth/domain/policies/rbac/AdminPolicy';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserBannedEvent } from '@modules/auth/domain/events/UserBannedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class BanUserCommandHandler implements ICommandHandler<BanUserCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: BanUserCommand): Promise<void> {
    try {
      // Assuming AdminPolicy check here: AdminPolicy.isAdmin(adminRole, command.adminUserId);
      const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToBan));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // user.ban();
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'BAN_USER',
        resource: command.userIdToBan,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new UserBannedEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'BAN_USER',
        resource: command.userIdToBan,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to ban user');
    }
  }
}
