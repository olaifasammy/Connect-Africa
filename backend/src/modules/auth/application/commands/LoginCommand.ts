import { ICommand } from '@shared/application/commands/ICommand';

export class LoginCommand implements ICommand {
  constructor(public readonly email: string, public readonly password: string) {}
}
