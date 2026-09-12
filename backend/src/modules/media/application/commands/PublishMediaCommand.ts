import { ICommand } from '../../../../shared/application/commands/ICommand';

export class PublishMediaCommand implements ICommand {
  constructor(public readonly id: string) {}
}
