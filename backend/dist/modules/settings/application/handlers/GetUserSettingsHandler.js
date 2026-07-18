"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSettingsHandler = void 0;
class GetUserSettingsHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(userId) {
        // Assuming repository has method to get user settings
        const settings = await this.repository.findById(userId);
        if (!settings)
            return null;
        // ... logic
        return {
            userId: userId,
            theme: 'light',
            notificationsEnabled: true
        };
    }
}
exports.GetUserSettingsHandler = GetUserSettingsHandler;
//# sourceMappingURL=GetUserSettingsHandler.js.map