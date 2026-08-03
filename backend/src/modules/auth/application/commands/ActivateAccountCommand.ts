import { ICommand } from '@shared/application/commands/ICommand';

export class ActivateAccountCommand implements ICommand {
  constructor(public readonly userId: string, public readonly ipAddress?: string) {}
}
