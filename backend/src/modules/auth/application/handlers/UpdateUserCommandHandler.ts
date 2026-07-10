import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { UpdateUserCommand } from '../commands/UpdateUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, void> {
  constructor(private userRepository: IUserRepository) {}

  async handle(command: UpdateUserCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userIdToUpdate));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Update user logic...
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'UPDATE_USER',
        resource: command.userIdToUpdate,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'UPDATE_USER',
        resource: command.userIdToUpdate,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to update user');
    }
  }
}
