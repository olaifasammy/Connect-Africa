import { ICommand } from '@shared/application/commands/ICommand';

export class UploadAvatarCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly avatarUrl: string,
    public readonly ipAddress?: string
  ) {}
}
