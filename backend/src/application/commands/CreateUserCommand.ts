import { ICommand } from './ICommand';

export class CreateUserCommand implements ICommand {
  constructor(public readonly email: string) {}
}
