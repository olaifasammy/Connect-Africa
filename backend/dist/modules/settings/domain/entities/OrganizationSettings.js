"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSettings = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class OrganizationSettings extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new OrganizationSettings(props, id);
    }
}
exports.OrganizationSettings = OrganizationSettings;
//# sourceMappingURL=OrganizationSettings.js.map