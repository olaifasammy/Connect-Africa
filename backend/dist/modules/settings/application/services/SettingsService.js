"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
class SettingsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async validateSettings(userId) {
        const settings = await this.repository.findById(userId);
        return !!settings;
    }
}
exports.SettingsService = SettingsService;
//# sourceMappingURL=SettingsService.js.map