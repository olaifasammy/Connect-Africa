"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const SettingsEvents_1 = require("../events/SettingsEvents");
class Settings extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get userId() { return this.props.userId; }
    get theme() { return this.props.theme; }
    get timezone() { return this.props.timezone; }
    get locale() { return this.props.locale; }
    updateTheme(theme) {
        this.props.theme = theme;
        this.addDomainEvent(new SettingsEvents_1.SettingsUpdatedEvent(this.id, 'theme', theme.toString()));
    }
}
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map