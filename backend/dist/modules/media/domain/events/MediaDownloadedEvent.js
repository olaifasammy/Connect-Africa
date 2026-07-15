"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDownloadedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaDownloadedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaDownloadedEvent = MediaDownloadedEvent;
//# sourceMappingURL=MediaDownloadedEvent.js.map