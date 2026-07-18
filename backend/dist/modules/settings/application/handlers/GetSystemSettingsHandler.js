"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSystemSettingsHandler = void 0;
class GetSystemSettingsHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle() {
        // ... logic
        return {
            maintenanceMode: false,
            registrationEnabled: true
        };
    }
}
exports.GetSystemSettingsHandler = GetSystemSettingsHandler;
//# sourceMappingURL=GetSystemSettingsHandler.js.map