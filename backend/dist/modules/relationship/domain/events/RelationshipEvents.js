"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipVersionCreatedEvent = exports.RelationshipMergedEvent = exports.RelationshipRestoredEvent = exports.RelationshipArchivedEvent = exports.RelationshipPublishedEvent = exports.RelationshipDeletedEvent = exports.RelationshipUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RelationshipUpdatedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    constructor(relationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
    }
}
exports.RelationshipUpdatedEvent = RelationshipUpdatedEvent;
class RelationshipDeletedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    constructor(relationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
    }
}
exports.RelationshipDeletedEvent = RelationshipDeletedEvent;
class RelationshipPublishedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    constructor(relationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
    }
}
exports.RelationshipPublishedEvent = RelationshipPublishedEvent;
class RelationshipArchivedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    constructor(relationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
    }
}
exports.RelationshipArchivedEvent = RelationshipArchivedEvent;
class RelationshipRestoredEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    constructor(relationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
    }
}
exports.RelationshipRestoredEvent = RelationshipRestoredEvent;
class RelationshipMergedEvent extends DomainEvent_1.DomainEvent {
    sourceRelationshipId;
    targetRelationshipId;
    constructor(sourceRelationshipId, targetRelationshipId) {
        super(new UniqueEntityId_1.UniqueEntityId(sourceRelationshipId));
        this.sourceRelationshipId = sourceRelationshipId;
        this.targetRelationshipId = targetRelationshipId;
    }
}
exports.RelationshipMergedEvent = RelationshipMergedEvent;
class RelationshipVersionCreatedEvent extends DomainEvent_1.DomainEvent {
    relationshipId;
    versionNumber;
    constructor(relationshipId, versionNumber) {
        super(new UniqueEntityId_1.UniqueEntityId(relationshipId));
        this.relationshipId = relationshipId;
        this.versionNumber = versionNumber;
    }
}
exports.RelationshipVersionCreatedEvent = RelationshipVersionCreatedEvent;
//# sourceMappingURL=RelationshipEvents.js.map