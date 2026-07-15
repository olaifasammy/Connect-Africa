"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSystemSettingsQuery = exports.GetUserSettingsQuery = exports.GetSettingsQuery = void 0;
class GetSettingsQuery {
    userId;
    constructor(userId) {
        this.userId = userId;
    }
}
exports.GetSettingsQuery = GetSettingsQuery;
class GetUserSettingsQuery {
    userId;
    constructor(userId) {
        this.userId = userId;
    }
}
exports.GetUserSettingsQuery = GetUserSettingsQuery;
class GetSystemSettingsQuery {
    constructor() { }
}
exports.GetSystemSettingsQuery = GetSystemSettingsQuery;
//# sourceMappingURL=SettingsQueries.js.map