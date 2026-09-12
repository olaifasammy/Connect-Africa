import { ICommand } from '@shared/application/commands/ICommand';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly displayName?: string,
    public readonly bio?: string,
    public readonly avatarUrl?: string,
    public readonly ipAddress?: string
  ) {}
}
