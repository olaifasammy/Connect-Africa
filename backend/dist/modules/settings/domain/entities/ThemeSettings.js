"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeSettings = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ThemeSettings extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new ThemeSettings(props, id);
    }
    get theme() {
        return this.props.theme;
    }
    update(theme) {
        this.props.theme = theme;
    }
}
exports.ThemeSettings = ThemeSettings;
//# sourceMappingURL=ThemeSettings.js.map