import { ICommand } from '@shared/application/commands/ICommand';

export class UpdateReadingProgressCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly articleId: string,
    public readonly progress: number,
    public readonly ipAddress: string
  ) {}
}
