import { ICommand } from '@shared/application/commands/ICommand';

export class RestoreAccountCommand implements ICommand {
  constructor(public readonly userId: string, public readonly ipAddress?: string) {}
}
