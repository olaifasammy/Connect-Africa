"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditActor = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AuditActor extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id || new UniqueEntityId_1.UniqueEntityId());
    }
    static create(props, id) {
        return new AuditActor(props, id);
    }
    get userId() {
        return this.props.userId;
    }
    get actorType() {
        return this.props.actorType;
    }
    get ipAddress() {
        return this.props.ipAddress;
    }
    get userAgent() {
        return this.props.userAgent;
    }
}
exports.AuditActor = AuditActor;
//# sourceMappingURL=AuditActor.js.map