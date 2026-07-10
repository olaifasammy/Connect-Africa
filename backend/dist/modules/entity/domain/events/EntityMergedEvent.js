"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMergedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class EntityMergedEvent extends DomainEvent_1.DomainEvent {
    sourceEntityId;
    targetEntityId;
    constructor(sourceEntityId, targetEntityId) {
        super(new UniqueEntityId_1.UniqueEntityId(targetEntityId.value));
        this.sourceEntityId = sourceEntityId;
        this.targetEntityId = targetEntityId;
    }
}
exports.EntityMergedEvent = EntityMergedEvent;
//# sourceMappingURL=EntityMergedEvent.js.map