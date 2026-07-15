import { ICommand } from '../../../../shared/application/commands/ICommand';

export class ArchiveMediaCommand implements ICommand {
  constructor(public readonly id: string) {}
}
