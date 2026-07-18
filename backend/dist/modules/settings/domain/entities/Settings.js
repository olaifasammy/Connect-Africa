"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const SettingsEvents_1 = require("../events/SettingsEvents");
class Settings extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new Settings(props, id);
    }
    get userId() { return this.props.userId; }
    get themeSettings() { return this.props.themeSettings; }
    get notificationSettings() { return this.props.notificationSettings; }
    get privacySettings() { return this.props.privacySettings; }
    get languageSettings() { return this.props.languageSettings; }
    get securitySettings() { return this.props.securitySettings; }
    get preferenceSettings() { return this.props.preferenceSettings; }
    updateTheme(theme) {
        this.props.themeSettings = theme;
        this.addDomainEvent(new SettingsEvents_1.SettingsUpdatedEvent(this.id, 'theme', theme.theme.toString()));
    }
    updateLanguage(locale) {
        this.props.languageSettings.updateLocale(locale);
        this.addDomainEvent(new SettingsEvents_1.SettingsUpdatedEvent(this.id, 'locale', locale.toString()));
    }
    updateTimezone(timezone) {
        this.props.languageSettings.updateTimezone(timezone);
        this.addDomainEvent(new SettingsEvents_1.SettingsUpdatedEvent(this.id, 'timezone', timezone.toString()));
    }
}
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map