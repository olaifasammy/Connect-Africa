"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsNotFoundError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class SettingsNotFoundError extends BaseError_1.BaseError {
    constructor(userId) {
        super(`Settings not found for user ${userId}`, 'SETTINGS_NOT_FOUND');
    }
}
exports.SettingsNotFoundError = SettingsNotFoundError;
//# sourceMappingURL=SettingsError.js.map