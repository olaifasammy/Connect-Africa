import { ICommand } from '@shared/application/commands/ICommand';

export class VerifyEmailCommand implements ICommand {
  constructor(public readonly userId: string, public readonly token: string, public readonly ipAddress?: string) {}
}
