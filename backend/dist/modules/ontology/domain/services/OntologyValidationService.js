"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyValidationService = void 0;
const DomainError_1 = require("../errors/DomainError");
class OntologyValidationService {
    validate(ontology) {
        if (!ontology.name || ontology.name.trim() === '') {
            throw new DomainError_1.DomainError('Ontology name is required.');
        }
        // Additional domain-level validation rules can be added here.
    }
}
exports.OntologyValidationService = OntologyValidationService;
//# sourceMappingURL=OntologyValidationService.js.map