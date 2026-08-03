import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RevokeSessionCommand } from '@modules/auth/application/commands/RevokeSessionCommand';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';

export class RevokeSessionCommandHandler implements ICommandHandler<RevokeSessionCommand, void> {
  constructor(
    private sessionRepository: ISessionRepository
  ) {}

  async handle(command: RevokeSessionCommand): Promise<void> {
    await this.sessionRepository.invalidateSession(command.token);
  }
}
