"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacySettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class PrivacySettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new PrivacySettings(props, id);
    }
    get level() { return this.props.level; }
    updateLevel(level) {
        this.props.level = level;
    }
}
exports.PrivacySettings = PrivacySettings;
//# sourceMappingURL=PrivacySettings.js.map