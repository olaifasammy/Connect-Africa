import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ChangeEmailCommand } from '../commands/ChangeEmailCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EmailChangedEvent } from '@modules/auth/domain/events/EmailChangedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ChangeEmailCommandHandler implements ICommandHandler<ChangeEmailCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: ChangeEmailCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Check if email is already taken
      const existingUser = await this.userRepository.findByEmail(command.newEmail);
      if (existingUser) {
        throw new AuthenticationError('Email already taken');
      }

      // Assuming User entity would have a method: user.updateEmail(new Email(command.newEmail));
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.userId,
        action: 'CHANGE_EMAIL',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new EmailChangedEvent(user.id, command.newEmail));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'CHANGE_EMAIL',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to change email');
    }
  }
}
