"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
class DomainEvent {
    occurredOn;
    aggregateId;
    constructor(aggregateId) {
        this.occurredOn = new Date();
        this.aggregateId = aggregateId;
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=DomainEvent.js.map