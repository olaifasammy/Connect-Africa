"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTypeDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class RelationshipTypeDeletedEvent extends DomainEvent_1.DomainEvent {
    relationshipTypeId;
    constructor(relationshipTypeId) {
        super(relationshipTypeId);
        this.relationshipTypeId = relationshipTypeId;
    }
}
exports.RelationshipTypeDeletedEvent = RelationshipTypeDeletedEvent;
//# sourceMappingURL=RelationshipTypeDeletedEvent.js.map