"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SourceDeletedEvent extends DomainEvent_1.DomainEvent {
    sourceId;
    constructor(sourceId) {
        super(sourceId);
        this.sourceId = sourceId;
    }
}
exports.SourceDeletedEvent = SourceDeletedEvent;
//# sourceMappingURL=SourceDeletedEvent.js.map