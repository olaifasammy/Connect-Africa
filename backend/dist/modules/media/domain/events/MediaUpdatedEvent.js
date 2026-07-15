"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaUpdatedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaUpdatedEvent = MediaUpdatedEvent;
//# sourceMappingURL=MediaUpdatedEvent.js.map