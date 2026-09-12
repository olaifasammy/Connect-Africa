import { ICommand } from '../../../../shared/application/commands/ICommand';

export class DeleteMediaCommand implements ICommand {
  constructor(public readonly id: string) {}
}
