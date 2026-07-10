import { ICommand } from '@shared/application/commands/ICommand';

export class AssignRoleCommand implements ICommand {
  constructor(
    public readonly adminUserId: string,
    public readonly userId: string,
    public readonly role: string,
    public readonly ipAddress?: string
  ) {}
}
