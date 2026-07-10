"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyVersionRollbackEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyVersionRollbackEvent extends DomainEvent_1.DomainEvent {
    ontologyVersionId;
    constructor(ontologyVersionId) {
        super(ontologyVersionId);
        this.ontologyVersionId = ontologyVersionId;
    }
}
exports.OntologyVersionRollbackEvent = OntologyVersionRollbackEvent;
//# sourceMappingURL=OntologyVersionRollbackEvent.js.map