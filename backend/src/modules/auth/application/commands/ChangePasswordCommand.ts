import { ICommand } from '@shared/application/commands/ICommand';

export class ChangePasswordCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly currentPassword: string,
    public readonly newPassword: string,
    public readonly ipAddress?: string
  ) {}
}
