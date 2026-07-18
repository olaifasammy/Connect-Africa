"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class LanguageSettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new LanguageSettings(props, id);
    }
    get locale() { return this.props.locale; }
    get timezone() { return this.props.timezone; }
    updateLocale(locale) {
        this.props.locale = locale;
    }
    updateTimezone(timezone) {
        this.props.timezone = timezone;
    }
}
exports.LanguageSettings = LanguageSettings;
//# sourceMappingURL=LanguageSettings.js.map