import { ICommand } from '@shared/application/commands/ICommand';

export class ResetPasswordCommand implements ICommand {
  constructor(
    public readonly email: string, 
    public readonly newPassword: string, 
    public readonly resetToken: string, 
    public readonly ipAddress?: string
  ) {}
}
