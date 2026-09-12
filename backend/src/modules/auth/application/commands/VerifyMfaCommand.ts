import { ICommand } from '@shared/application/commands/ICommand';

export class VerifyMfaCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly code: string,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}
