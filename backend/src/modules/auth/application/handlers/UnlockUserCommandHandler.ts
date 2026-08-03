import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UnlockUserCommand } from '@modules/auth/application/commands/UnlockUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class UnlockUserCommandHandler implements ICommandHandler<UnlockUserCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: UnlockUserCommand): Promise<void> {
    const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToUnlock));
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    user.unlock();
    await this.userRepository.save(user);
    
    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UNLOCK_USER',
        actorId: command.adminUserId,
        actorType: 'ADMIN',
        ipAddress: command.ipAddress || '127.0.0.1',
        userAgent: 'unknown',
        resourceId: user.id.toString(),
        resourceType: 'USER',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
