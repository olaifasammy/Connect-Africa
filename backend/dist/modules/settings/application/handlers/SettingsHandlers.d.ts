import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
export declare class UpdateSettingsHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: UpdateSettingsCommand): Promise<void>;
}
export declare class UpdateLanguageHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: UpdateLanguageCommand): Promise<void>;
}
export declare class UpdatePrivacyHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: UpdatePrivacyCommand): Promise<void>;
}
export declare class UpdateNotificationSettingsHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: UpdateNotificationSettingsCommand): Promise<void>;
}
export declare class UpdateSecuritySettingsHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: UpdateSecuritySettingsCommand): Promise<void>;
}
export declare class ResetSettingsHandler {
    private readonly settingsRepository;
    constructor(settingsRepository: ISettingsRepository);
    handle(command: ResetSettingsCommand): Promise<void>;
}
