"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProfileId = exports.PrivacyLevel = exports.NotificationPreference = exports.MeasurementUnit = exports.Currency = exports.DateFormat = exports.Locale = exports.Timezone = exports.Theme = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class Theme extends ValueObject_1.ValueObject {
    static LIGHT = 'light';
    static DARK = 'dark';
    constructor(value) {
        if (![Theme.LIGHT, Theme.DARK].includes(value)) {
            throw new Error(`Invalid theme: ${value}`);
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.Theme = Theme;
class Timezone extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('Timezone cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.Timezone = Timezone;
class Locale extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('Locale cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.Locale = Locale;
class DateFormat extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('DateFormat cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.DateFormat = DateFormat;
class Currency extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('Currency cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.Currency = Currency;
class MeasurementUnit extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('MeasurementUnit cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.MeasurementUnit = MeasurementUnit;
class NotificationPreference extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('NotificationPreference cannot be empty');
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.NotificationPreference = NotificationPreference;
class PrivacyLevel extends ValueObject_1.ValueObject {
    static PUBLIC = 'public';
    static PRIVATE = 'private';
    constructor(value) {
        if (![PrivacyLevel.PUBLIC, PrivacyLevel.PRIVATE].includes(value)) {
            throw new Error(`Invalid privacy level: ${value}`);
        }
        super({ value });
    }
    toString() { return this.props.value; }
}
exports.PrivacyLevel = PrivacyLevel;
class SettingsProfileId extends UniqueEntityId_1.UniqueEntityId {
}
exports.SettingsProfileId = SettingsProfileId;
//# sourceMappingURL=SettingsValueObjects.js.map