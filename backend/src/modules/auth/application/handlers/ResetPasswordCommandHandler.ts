import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ResetPasswordCommand } from '../commands/ResetPasswordCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { PasswordResetEvent } from '@modules/auth/domain/events/PasswordResetEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';

export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private eventBus: EventBus
  ) {}

  async handle(command: ResetPasswordCommand): Promise<void> {
    try {
      // In a real implementation, we would validate the reset token here.
      const user = await this.userRepository.findByEmail(command.email);
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      
      const hashedPassword = await this.passwordHasher.hash(command.newPassword);
      // Assuming User entity has a method to update password
      // user.updatePassword(new PasswordHash(hashedPassword));
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: user.id.toString(),
        action: 'RESET_PASSWORD',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new PasswordResetEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.email,
        action: 'RESET_PASSWORD',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to reset password');
    }
  }
}
