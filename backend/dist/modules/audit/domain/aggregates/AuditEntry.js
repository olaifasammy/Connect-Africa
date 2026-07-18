"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEntry = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const AuditValueObjects_1 = require("../value-objects/AuditValueObjects");
class AuditEntry extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || new AuditValueObjects_1.AuditId());
    }
    static create(props, id) {
        return new AuditEntry(props, id);
    }
    get action() {
        return this.props.action;
    }
    get actor() {
        return this.props.actor;
    }
    get resource() {
        return this.props.resource;
    }
    get metadata() {
        return this.props.metadata;
    }
    get correlationId() {
        return this.props.correlationId;
    }
    get timestamp() {
        return this.props.timestamp;
    }
}
exports.AuditEntry = AuditEntry;
//# sourceMappingURL=AuditEntry.js.map