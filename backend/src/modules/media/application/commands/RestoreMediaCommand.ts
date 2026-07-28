import { ICommand } from '../../../../shared/application/commands/ICommand';

export class RestoreMediaCommand implements ICommand {
  constructor(public readonly id: string) {}
}
