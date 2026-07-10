"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
class AggregateRoot extends Entity_1.Entity {
    _domainEvents = [];
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    clearDomainEvents() {
        this._domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map