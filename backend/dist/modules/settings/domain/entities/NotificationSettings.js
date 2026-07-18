"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class NotificationSettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new NotificationSettings(props, id);
    }
    get enabled() { return this.props.enabled; }
    get preference() { return this.props.preference; }
    enable() {
        this.props.enabled = true;
    }
    disable() {
        this.props.enabled = false;
    }
    updatePreference(preference) {
        this.props.preference = preference;
    }
}
exports.NotificationSettings = NotificationSettings;
//# sourceMappingURL=NotificationSettings.js.map