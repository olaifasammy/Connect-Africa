"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityCreatedEvent extends DomainEvent_1.DomainEvent {
    entity;
    constructor(entity) {
        super(entity.id);
        this.entity = entity;
    }
}
exports.EntityCreatedEvent = EntityCreatedEvent;
//# sourceMappingURL=EntityCreatedEvent.js.map