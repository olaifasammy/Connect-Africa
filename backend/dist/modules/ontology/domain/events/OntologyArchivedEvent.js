"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyArchivedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyArchivedEvent extends DomainEvent_1.DomainEvent {
    ontologyId;
    constructor(ontologyId) {
        super(ontologyId);
        this.ontologyId = ontologyId;
    }
}
exports.OntologyArchivedEvent = OntologyArchivedEvent;
//# sourceMappingURL=OntologyArchivedEvent.js.map