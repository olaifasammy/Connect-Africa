"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyVersionCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyVersionCreatedEvent extends DomainEvent_1.DomainEvent {
    ontologyVersionId;
    constructor(ontologyVersionId) {
        super(ontologyVersionId);
        this.ontologyVersionId = ontologyVersionId;
    }
}
exports.OntologyVersionCreatedEvent = OntologyVersionCreatedEvent;
//# sourceMappingURL=OntologyVersionCreatedEvent.js.map