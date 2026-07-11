"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SourceCreatedEvent extends DomainEvent_1.DomainEvent {
    sourceId;
    constructor(sourceId) {
        super(sourceId);
        this.sourceId = sourceId;
    }
}
exports.SourceCreatedEvent = SourceCreatedEvent;
//# sourceMappingURL=SourceCreatedEvent.js.map