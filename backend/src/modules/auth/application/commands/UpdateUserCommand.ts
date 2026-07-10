import { ICommand } from '@shared/application/commands/ICommand';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly adminUserId: string,
    public readonly userIdToUpdate: string,
    public readonly updates: Record<string, any>,
    public readonly ipAddress?: string
  ) {}
}
