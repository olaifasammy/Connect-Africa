import { ICommand } from '../../../../shared/application/commands/ICommand';

export class CopyMediaCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly destinationId: string
  ) {}
}
