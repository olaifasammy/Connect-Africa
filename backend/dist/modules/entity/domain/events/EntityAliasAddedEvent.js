"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAliasAddedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class EntityAliasAddedEvent extends DomainEvent_1.DomainEvent {
    entityId;
    alias;
    constructor(entityId, alias) {
        super(new UniqueEntityId_1.UniqueEntityId(entityId.value));
        this.entityId = entityId;
        this.alias = alias;
    }
}
exports.EntityAliasAddedEvent = EntityAliasAddedEvent;
//# sourceMappingURL=EntityAliasAddedEvent.js.map