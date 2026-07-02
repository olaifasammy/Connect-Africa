import { ICommand } from '../ICommand';

export class LoginCommand implements ICommand {
  constructor(public readonly email: string, public readonly password: string) {}
}
