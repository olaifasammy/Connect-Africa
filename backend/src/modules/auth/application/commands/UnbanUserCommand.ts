import { ICommand } from '@shared/application/commands/ICommand';

export class UnbanUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToUnban: string, public readonly ipAddress?: string) {}
}
