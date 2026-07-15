"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSettingsHandler = exports.UpdateSecuritySettingsHandler = exports.UpdateNotificationSettingsHandler = exports.UpdatePrivacyHandler = exports.UpdateLanguageHandler = exports.UpdateSettingsHandler = void 0;
class UpdateSettingsHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        // ... logic
        await this.settingsRepository.save(settings);
    }
}
exports.UpdateSettingsHandler = UpdateSettingsHandler;
class UpdateLanguageHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        // ... logic
        await this.settingsRepository.save(settings);
    }
}
exports.UpdateLanguageHandler = UpdateLanguageHandler;
class UpdatePrivacyHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        // ... logic
        await this.settingsRepository.save(settings);
    }
}
exports.UpdatePrivacyHandler = UpdatePrivacyHandler;
class UpdateNotificationSettingsHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        // ... logic
        await this.settingsRepository.save(settings);
    }
}
exports.UpdateNotificationSettingsHandler = UpdateNotificationSettingsHandler;
class UpdateSecuritySettingsHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        // ... logic
        await this.settingsRepository.save(settings);
    }
}
exports.UpdateSecuritySettingsHandler = UpdateSecuritySettingsHandler;
class ResetSettingsHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        // ... logic
    }
}
exports.ResetSettingsHandler = ResetSettingsHandler;
//# sourceMappingURL=SettingsHandlers.js.map