"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAliasRemovedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class EntityAliasRemovedEvent extends DomainEvent_1.DomainEvent {
    entityId;
    alias;
    constructor(entityId, alias) {
        super(new UniqueEntityId_1.UniqueEntityId(entityId.value));
        this.entityId = entityId;
        this.alias = alias;
    }
}
exports.EntityAliasRemovedEvent = EntityAliasRemovedEvent;
//# sourceMappingURL=EntityAliasRemovedEvent.js.map