"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditResource = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AuditResource extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new AuditResource(props, id);
    }
    get resourceId() {
        return this.props.id;
    }
    get type() {
        return this.props.type;
    }
}
exports.AuditResource = AuditResource;
//# sourceMappingURL=AuditResource.js.map