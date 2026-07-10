"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyUpdatedEvent extends DomainEvent_1.DomainEvent {
    ontologyId;
    constructor(ontologyId) {
        super(ontologyId);
        this.ontologyId = ontologyId;
    }
}
exports.OntologyUpdatedEvent = OntologyUpdatedEvent;
//# sourceMappingURL=OntologyUpdatedEvent.js.map