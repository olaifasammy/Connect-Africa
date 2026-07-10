"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTypeUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class RelationshipTypeUpdatedEvent extends DomainEvent_1.DomainEvent {
    relationshipTypeId;
    constructor(relationshipTypeId) {
        super(relationshipTypeId);
        this.relationshipTypeId = relationshipTypeId;
    }
}
exports.RelationshipTypeUpdatedEvent = RelationshipTypeUpdatedEvent;
//# sourceMappingURL=RelationshipTypeUpdatedEvent.js.map