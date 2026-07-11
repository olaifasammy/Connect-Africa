"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SourceUpdatedEvent extends DomainEvent_1.DomainEvent {
    sourceId;
    constructor(sourceId) {
        super(sourceId);
        this.sourceId = sourceId;
    }
}
exports.SourceUpdatedEvent = SourceUpdatedEvent;
//# sourceMappingURL=SourceUpdatedEvent.js.map