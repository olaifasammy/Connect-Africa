import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { EnableAccountCommand } from '@modules/auth/application/commands/EnableAccountCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class EnableAccountCommandHandler implements ICommandHandler<EnableAccountCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: EnableAccountCommand): Promise<void> {
    const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToEnable));
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    user.activate();
    await this.userRepository.save(user);
    
    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'ENABLE_ACCOUNT',
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
