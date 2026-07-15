"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailGeneratedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class ThumbnailGeneratedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.ThumbnailGeneratedEvent = ThumbnailGeneratedEvent;
//# sourceMappingURL=ThumbnailGeneratedEvent.js.map