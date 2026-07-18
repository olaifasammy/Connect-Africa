"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettings = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class SystemSettings extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new SystemSettings(props, id);
    }
}
exports.SystemSettings = SystemSettings;
//# sourceMappingURL=SystemSettings.js.map