import { ICommand } from '@shared/application/commands/ICommand';

export class ChangeEmailCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly newEmail: string,
    public readonly ipAddress?: string
  ) {}
}
