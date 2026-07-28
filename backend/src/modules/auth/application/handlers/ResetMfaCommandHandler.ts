import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ResetMfaCommand } from '../commands/ResetMfaCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { MFADisabledEvent } from '@modules/auth/domain/events/MFADisabledEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ResetMfaCommandHandler implements ICommandHandler<ResetMfaCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: ResetMfaCommand): Promise<void> {
    try {
      const user = await this.userRepository.findById(new UniqueEntityId(command.userId));
      
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Logic to reset MFA
      await this.userRepository.save(user);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'RESET_MFA',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new MFADisabledEvent(user.id));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'RESET_MFA',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to reset MFA');
    }
  }
}
