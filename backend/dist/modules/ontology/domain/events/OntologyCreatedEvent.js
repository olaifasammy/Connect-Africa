"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyCreatedEvent extends DomainEvent_1.DomainEvent {
    ontologyId;
    name;
    constructor(ontologyId, name) {
        super(ontologyId);
        this.ontologyId = ontologyId;
        this.name = name;
    }
}
exports.OntologyCreatedEvent = OntologyCreatedEvent;
//# sourceMappingURL=OntologyCreatedEvent.js.map