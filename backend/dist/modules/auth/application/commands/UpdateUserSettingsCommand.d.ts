import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UpdateUserSettingsCommand implements ICommand {
    readonly userId: string;
    readonly theme?: "light" | "dark" | undefined;
    readonly language?: string | undefined;
    readonly timeZone?: string | undefined;
    readonly notificationPreferences?: Record<string, boolean> | undefined;
    readonly privacySettings?: Record<string, boolean> | undefined;
    readonly accessibilitySettings?: Record<string, any> | undefined;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, theme?: "light" | "dark" | undefined, language?: string | undefined, timeZone?: string | undefined, notificationPreferences?: Record<string, boolean> | undefined, privacySettings?: Record<string, boolean> | undefined, accessibilitySettings?: Record<string, any> | undefined, ipAddress?: string | undefined);
}
