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
    get language() { return this.props.language; }
    get timeZone() { return this.props.timeZone; }
    get notificationPreferences() { return this.props.notificationPreferences; }
    get privacySettings() { return this.props.privacySettings; }
    get accessibilitySettings() { return this.props.accessibilitySettings; }
    updateSettings(props) {
        Object.assign(this.props, props);
    }
}
exports.UserSettings = UserSettings;
//# sourceMappingURL=UserSettings.js.map