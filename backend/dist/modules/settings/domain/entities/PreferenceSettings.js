"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceSettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class PreferenceSettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new PreferenceSettings(props, id);
    }
    get key() { return this.props.key; }
    get value() { return this.props.value; }
    updateValue(value) {
        this.props.value = value;
    }
}
exports.PreferenceSettings = PreferenceSettings;
//# sourceMappingURL=PreferenceSettings.js.map