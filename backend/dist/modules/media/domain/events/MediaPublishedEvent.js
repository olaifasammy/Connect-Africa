"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPublishedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaPublishedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaPublishedEvent = MediaPublishedEvent;
//# sourceMappingURL=MediaPublishedEvent.js.map