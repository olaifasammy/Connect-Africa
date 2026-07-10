"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypeCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityTypeCreatedEvent extends DomainEvent_1.DomainEvent {
    entityTypeId;
    constructor(entityTypeId) {
        super(entityTypeId);
        this.entityTypeId = entityTypeId;
    }
}
exports.EntityTypeCreatedEvent = EntityTypeCreatedEvent;
//# sourceMappingURL=EntityTypeCreatedEvent.js.map