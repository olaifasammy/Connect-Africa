"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class EntityDeletedEvent extends DomainEvent_1.DomainEvent {
    entityId;
    constructor(entityId) {
        super(new UniqueEntityId_1.UniqueEntityId(entityId.value));
        this.entityId = entityId;
    }
}
exports.EntityDeletedEvent = EntityDeletedEvent;
//# sourceMappingURL=EntityDeletedEvent.js.map