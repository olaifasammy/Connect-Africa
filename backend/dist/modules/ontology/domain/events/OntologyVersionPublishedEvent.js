"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyVersionPublishedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class OntologyVersionPublishedEvent extends DomainEvent_1.DomainEvent {
    ontologyVersionId;
    constructor(ontologyVersionId) {
        super(ontologyVersionId);
        this.ontologyVersionId = ontologyVersionId;
    }
}
exports.OntologyVersionPublishedEvent = OntologyVersionPublishedEvent;
//# sourceMappingURL=OntologyVersionPublishedEvent.js.map