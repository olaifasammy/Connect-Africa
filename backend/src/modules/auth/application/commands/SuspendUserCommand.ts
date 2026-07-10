import { ICommand } from '@shared/application/commands/ICommand';

export class SuspendUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToSuspend: string, public readonly ipAddress?: string) {}
}
