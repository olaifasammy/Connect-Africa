"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaDeletedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaDeletedEvent = MediaDeletedEvent;
//# sourceMappingURL=MediaDeletedEvent.js.map