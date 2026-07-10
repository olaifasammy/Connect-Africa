"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityVersionCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityVersionCreatedEvent extends DomainEvent_1.DomainEvent {
    version;
    constructor(version) {
        super(version.id);
        this.version = version;
    }
}
exports.EntityVersionCreatedEvent = EntityVersionCreatedEvent;
//# sourceMappingURL=EntityVersionCreatedEvent.js.map