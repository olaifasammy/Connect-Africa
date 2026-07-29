import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RevokeAllUserSessionsCommand } from '@modules/auth/application/commands/RevokeAllUserSessionsCommand';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SessionRevokedEvent } from '@modules/auth/domain/events/SessionRevokedEvent';

export class RevokeAllUserSessionsCommandHandler implements ICommandHandler<RevokeAllUserSessionsCommand, void> {
  constructor(
    private sessionRepository: ISessionRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: RevokeAllUserSessionsCommand): Promise<void> {
    await this.sessionRepository.revokeAllUserSessions(new UniqueEntityId(command.userId));
    await this.eventBus.publish(new SessionRevokedEvent(new UniqueEntityId(command.userId), 'all'));
  }
}
