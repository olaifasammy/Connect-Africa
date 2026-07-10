"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityPublishedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EntityPublishedEvent extends DomainEvent_1.DomainEvent {
    entity;
    constructor(entity) {
        super(entity.id);
        this.entity = entity;
    }
}
exports.EntityPublishedEvent = EntityPublishedEvent;
//# sourceMappingURL=EntityPublishedEvent.js.map