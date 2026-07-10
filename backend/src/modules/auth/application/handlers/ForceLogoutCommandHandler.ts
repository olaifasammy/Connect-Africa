import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ForceLogoutCommand } from '../commands/ForceLogoutCommand';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SessionRevokedEvent } from '@modules/auth/domain/events/SessionRevokedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ForceLogoutCommandHandler implements ICommandHandler<ForceLogoutCommand, void> {
  constructor(
    private sessionRepository: ISessionRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: ForceLogoutCommand): Promise<void> {
    try {
      // In a real scenario, this would invalidate all sessions for the userId
      await this.sessionRepository.invalidateSession(command.userId);
      
      AuditLogger.log({
        user: command.adminUserId,
        action: 'FORCE_LOGOUT',
        resource: command.userId,
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });
      
      await this.eventBus.publish(new SessionRevokedEvent(new UniqueEntityId(command.userId), 'ALL'));
    } catch (error) {
      AuditLogger.log({
        user: command.adminUserId,
        action: 'FORCE_LOGOUT',
        resource: command.userId,
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to force logout');
    }
  }
}
