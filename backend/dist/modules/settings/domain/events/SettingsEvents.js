"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySettingChangedEvent = exports.PrivacySettingChangedEvent = exports.NotificationPreferenceChangedEvent = exports.LanguageChangedEvent = exports.ThemeChangedEvent = exports.SettingsUpdatedEvent = exports.SettingsCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SettingsCreatedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    constructor(aggregateId) {
        super(aggregateId);
        this.aggregateId = aggregateId;
    }
}
exports.SettingsCreatedEvent = SettingsCreatedEvent;
class SettingsUpdatedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    setting;
    value;
    constructor(aggregateId, setting, value) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.setting = setting;
        this.value = value;
    }
}
exports.SettingsUpdatedEvent = SettingsUpdatedEvent;
class ThemeChangedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    theme;
    constructor(aggregateId, theme) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.theme = theme;
    }
}
exports.ThemeChangedEvent = ThemeChangedEvent;
class LanguageChangedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    locale;
    constructor(aggregateId, locale) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.locale = locale;
    }
}
exports.LanguageChangedEvent = LanguageChangedEvent;
class NotificationPreferenceChangedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    preference;
    constructor(aggregateId, preference) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.preference = preference;
    }
}
exports.NotificationPreferenceChangedEvent = NotificationPreferenceChangedEvent;
class PrivacySettingChangedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    level;
    constructor(aggregateId, level) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.level = level;
    }
}
exports.PrivacySettingChangedEvent = PrivacySettingChangedEvent;
class SecuritySettingChangedEvent extends DomainEvent_1.DomainEvent {
    aggregateId;
    setting;
    constructor(aggregateId, setting) {
        super(aggregateId);
        this.aggregateId = aggregateId;
        this.setting = setting;
    }
}
exports.SecuritySettingChangedEvent = SecuritySettingChangedEvent;
//# sourceMappingURL=SettingsEvents.js.map