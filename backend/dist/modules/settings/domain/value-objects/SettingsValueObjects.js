"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyLevel = exports.NotificationPreference = exports.MeasurementUnit = exports.Currency = exports.DateFormat = exports.Locale = exports.Timezone = exports.Theme = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class Theme extends UniqueEntityId_1.UniqueEntityId {
    static LIGHT = 'light';
    static DARK = 'dark';
    constructor(value) {
        if (![Theme.LIGHT, Theme.DARK].includes(value)) {
            throw new Error(`Invalid theme: ${value}`);
        }
        super(value);
    }
}
exports.Theme = Theme;
class Timezone extends UniqueEntityId_1.UniqueEntityId {
}
exports.Timezone = Timezone;
class Locale extends UniqueEntityId_1.UniqueEntityId {
}
exports.Locale = Locale;
class DateFormat extends UniqueEntityId_1.UniqueEntityId {
}
exports.DateFormat = DateFormat;
class Currency extends UniqueEntityId_1.UniqueEntityId {
}
exports.Currency = Currency;
class MeasurementUnit extends UniqueEntityId_1.UniqueEntityId {
}
exports.MeasurementUnit = MeasurementUnit;
class NotificationPreference extends UniqueEntityId_1.UniqueEntityId {
}
exports.NotificationPreference = NotificationPreference;
class PrivacyLevel extends UniqueEntityId_1.UniqueEntityId {
}
exports.PrivacyLevel = PrivacyLevel;
//# sourceMappingURL=SettingsValueObjects.js.map