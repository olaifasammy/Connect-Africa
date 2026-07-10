"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypeUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityTypeUpdatedEvent extends DomainEvent_1.DomainEvent {
    entityTypeId;
    constructor(entityTypeId) {
        super(entityTypeId);
        this.entityTypeId = entityTypeId;
    }
}
exports.EntityTypeUpdatedEvent = EntityTypeUpdatedEvent;
//# sourceMappingURL=EntityTypeUpdatedEvent.js.map