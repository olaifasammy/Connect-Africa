"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RelationshipCreatedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    sourceEntityId;
    targetEntityId;
    relationshipTypeId;
    constructor(relationshipId, sourceEntityId, targetEntityId, relationshipTypeId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
        this.relationshipTypeId = relationshipTypeId;
    }
}
exports.RelationshipCreatedEvent = RelationshipCreatedEvent;
//# sourceMappingURL=RelationshipCreatedEvent.js.map