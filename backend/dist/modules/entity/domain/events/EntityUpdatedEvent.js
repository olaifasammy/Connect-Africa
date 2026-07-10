"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityUpdatedEvent extends DomainEvent_1.DomainEvent {
    entity;
    constructor(entity) {
        super(entity.id);
        this.entity = entity;
    }
}
exports.EntityUpdatedEvent = EntityUpdatedEvent;
//# sourceMappingURL=EntityUpdatedEvent.js.map