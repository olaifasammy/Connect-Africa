"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRestoredEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaRestoredEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaRestoredEvent = MediaRestoredEvent;
//# sourceMappingURL=MediaRestoredEvent.js.map