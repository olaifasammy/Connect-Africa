import { ICommand } from '@shared/application/commands/ICommand';

export class RevokeSessionCommand implements ICommand {
  constructor(public readonly token: string) {}
}
