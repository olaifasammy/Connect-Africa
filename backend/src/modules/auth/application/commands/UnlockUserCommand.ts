import { ICommand } from '@shared/application/commands/ICommand';

export class UnlockUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToUnlock: string, public readonly ipAddress?: string) {}
}
