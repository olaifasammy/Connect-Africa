import { ICommand } from '@shared/application/commands/ICommand';

export class BanUserCommand implements ICommand {
  constructor(public readonly adminUserId: string, public readonly userIdToBan: string, public readonly ipAddress?: string) {}
}
