"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeThemeHandler = void 0;
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
class ChangeThemeHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        settings.updateTheme(new SettingsValueObjects_1.Theme(command.theme));
        await this.settingsRepository.save(settings);
    }
}
exports.ChangeThemeHandler = ChangeThemeHandler;
//# sourceMappingURL=ChangeThemeHandler.js.map