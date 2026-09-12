import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';

export class RevokeAllUserSessionsCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
