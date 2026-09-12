import { ICommand } from '@shared/application/commands/ICommand';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly email: string, public readonly password: string, public readonly ipAddress?: string) {}
}
