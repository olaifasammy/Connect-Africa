"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class SecuritySettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new SecuritySettings(props, id);
    }
    get mfaEnabled() { return this.props.mfaEnabled; }
    enableMfa() {
        this.props.mfaEnabled = true;
    }
    disableMfa() {
        this.props.mfaEnabled = false;
    }
}
exports.SecuritySettings = SecuritySettings;
//# sourceMappingURL=SecuritySettings.js.map