import { ICommand } from '@shared/application/commands/ICommand';

export class EnableAccountCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToEnable: string, public readonly ipAddress?: string) {}
}
