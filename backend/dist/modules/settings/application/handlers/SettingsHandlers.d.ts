import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UpdateSettingsHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: UpdateSettingsCommand): Promise<void>;
}
export declare class UpdateLanguageHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: UpdateLanguageCommand): Promise<void>;
}
export declare class UpdatePrivacyHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: UpdatePrivacyCommand): Promise<void>;
}
export declare class UpdateNotificationSettingsHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: UpdateNotificationSettingsCommand): Promise<void>;
}
export declare class UpdateSecuritySettingsHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: UpdateSecuritySettingsCommand): Promise<void>;
}
export declare class ResetSettingsHandler {
    private readonly settingsRepository;
    private readonly eventBus;
    constructor(settingsRepository: ISettingsRepository, eventBus: EventBus);
    handle(command: ResetSettingsCommand): Promise<void>;
}
