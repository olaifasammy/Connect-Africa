import { ICommand } from '@shared/application/commands/ICommand';

export class UpdateUserSettingsCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly theme?: 'light' | 'dark',
    public readonly language?: string,
    public readonly timeZone?: string,
    public readonly notificationPreferences?: Record<string, boolean>,
    public readonly privacySettings?: Record<string, boolean>,
    public readonly accessibilitySettings?: Record<string, any>,
    public readonly ipAddress?: string
  ) {}
}
