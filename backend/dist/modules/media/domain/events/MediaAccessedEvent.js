"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAccessedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaAccessedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaAccessedEvent = MediaAccessedEvent;
//# sourceMappingURL=MediaAccessedEvent.js.map