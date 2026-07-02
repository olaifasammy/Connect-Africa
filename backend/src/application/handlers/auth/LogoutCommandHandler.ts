import { ICommandHandler } from '../ICommandHandler';
import { ICommand } from '../../commands/ICommand';
import { ISessionRepository } from '@domain/auth/repositories/ISessionRepository';

export class LogoutCommand implements ICommand {
  constructor(public readonly token: string) {}
}

export class LogoutCommandHandler implements ICommandHandler<LogoutCommand, void> {
  constructor(private sessionRepository: ISessionRepository) {}
  async handle(command: LogoutCommand): Promise<void> {
    await this.sessionRepository.invalidateSession(command.token);
  }
}
