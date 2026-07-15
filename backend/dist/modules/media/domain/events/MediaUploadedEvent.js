"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUploadedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaUploadedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaUploadedEvent = MediaUploadedEvent;
//# sourceMappingURL=MediaUploadedEvent.js.map