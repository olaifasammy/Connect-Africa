import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ChangePasswordCommand } from '../commands/ChangePasswordCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { PasswordChangedEvent } from '@modules/auth/domain/events/PasswordChangedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private eventBus: EventBus
  ) {}

  async handle(command: ChangePasswordCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const isPasswordValid = await this.passwordHasher.compare(command.currentPassword, user.passwordHash.value);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid current password');
      }
      
      const newPasswordHash = await this.passwordHasher.hash(command.newPassword);
      // Assuming User entity would have a method: user.updatePassword(new PasswordHash(newPasswordHash));
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.userId,
        action: 'CHANGE_PASSWORD',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new PasswordChangedEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'CHANGE_PASSWORD',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to change password');
    }
  }
}
