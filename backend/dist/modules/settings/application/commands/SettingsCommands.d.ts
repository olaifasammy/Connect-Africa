export declare class CreateSettingsCommand {
    readonly userId: string;
    readonly theme: string;
    readonly timezone: string;
    readonly locale: string;
    constructor(userId: string, theme: string, timezone: string, locale: string);
}
export declare class UpdateSettingsCommand {
    readonly userId: string;
    readonly theme?: string | undefined;
    readonly timezone?: string | undefined;
    readonly locale?: string | undefined;
    constructor(userId: string, theme?: string | undefined, timezone?: string | undefined, locale?: string | undefined);
}
export declare class UpdateLanguageCommand {
    readonly userId: string;
    readonly locale: string;
    constructor(userId: string, locale: string);
}
export declare class UpdatePrivacyCommand {
    readonly userId: string;
    readonly level: string;
    constructor(userId: string, level: string);
}
export declare class UpdateNotificationSettingsCommand {
    readonly userId: string;
    readonly enabled: boolean;
    constructor(userId: string, enabled: boolean);
}
export declare class UpdateSecuritySettingsCommand {
    readonly userId: string;
    readonly mfaEnabled: boolean;
    constructor(userId: string, mfaEnabled: boolean);
}
export declare class ResetSettingsCommand {
    readonly userId: string;
    constructor(userId: string);
}
