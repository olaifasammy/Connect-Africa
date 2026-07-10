import { ICommand } from '@shared/application/commands/ICommand';

export class RestoreUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToRestore: string, public readonly ipAddress?: string) {}
}
