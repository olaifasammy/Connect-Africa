import { ICommand } from '@shared/application/commands/ICommand';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToDelete: string, public readonly ipAddress?: string) {}
}
