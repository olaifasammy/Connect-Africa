"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSettingsHandler = void 0;
class GetSettingsHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(userId) {
        const settings = await this.repository.findById(userId);
        if (!settings)
            return null;
        return {
            userId: settings.userId,
            theme: settings.themeSettings.theme.toString(),
            timezone: settings.languageSettings.timezone.toString(),
            locale: settings.languageSettings.locale.toString(),
        };
    }
}
exports.GetSettingsHandler = GetSettingsHandler;
//# sourceMappingURL=GetSettingsHandler.js.map