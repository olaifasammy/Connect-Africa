import { ICommand } from '@shared/application/commands/ICommand';

export class ForceLogoutCommand implements ICommand {
  constructor(
    public readonly adminUserId: string,
    public readonly userId: string,
    public readonly ipAddress?: string
  ) {}
}
