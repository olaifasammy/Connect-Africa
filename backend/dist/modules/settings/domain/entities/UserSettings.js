"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettings = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
class UserSettings extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new UserSettings(props, id);
    }
    get userId() { return this.props.userId; }
    get theme() { return this.props.theme; }
    get notificationsEnabled() { return this.props.notificationsEnabled; }
    get updatedAt() { return this.props.updatedAt; }
    updateTheme(theme) {
        this.props.theme = theme;
        this.props.updatedAt = new Date();
    }
    toggleNotifications(enabled) {
        this.props.notificationsEnabled = enabled;
        this.props.updatedAt = new Date();
    }
}
exports.UserSettings = UserSettings;
//# sourceMappingURL=UserSettings.js.map