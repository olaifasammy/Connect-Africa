import { ICommand } from '@shared/application/commands/ICommand';

export class AddBookmarkCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly articleId: string,
    public readonly ipAddress?: string
  ) {}
}
