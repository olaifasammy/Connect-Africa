import { ICommand } from '@shared/application/commands/ICommand';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly displayName?: string,
    public readonly bio?: string,
    public readonly avatarUrl?: string,
    public readonly coverImageUrl?: string,
    public readonly website?: string,
    public readonly socialLinks?: string[],
    public readonly country?: string,
    public readonly languages?: string[],
    public readonly expertise?: string[],
    public readonly researchInterests?: string[],
    public readonly ipAddress?: string
  ) {}
}
