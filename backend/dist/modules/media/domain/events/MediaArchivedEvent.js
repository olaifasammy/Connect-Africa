"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaArchivedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MediaArchivedEvent extends DomainEvent_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
}
exports.MediaArchivedEvent = MediaArchivedEvent;
//# sourceMappingURL=MediaArchivedEvent.js.map