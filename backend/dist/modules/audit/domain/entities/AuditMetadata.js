"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditMetadata = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AuditMetadata extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new AuditMetadata(props, id);
    }
    get key() {
        return this.props.key;
    }
    get value() {
        return this.props.value;
    }
}
exports.AuditMetadata = AuditMetadata;
//# sourceMappingURL=AuditMetadata.js.map