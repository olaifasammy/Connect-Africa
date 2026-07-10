"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypeDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityTypeDeletedEvent extends DomainEvent_1.DomainEvent {
    entityTypeId;
    constructor(entityTypeId) {
        super(entityTypeId);
        this.entityTypeId = entityTypeId;
    }
}
exports.EntityTypeDeletedEvent = EntityTypeDeletedEvent;
//# sourceMappingURL=EntityTypeDeletedEvent.js.map