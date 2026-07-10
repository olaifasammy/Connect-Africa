"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaEvolutionService = void 0;
const OntologyVersion_1 = require("../entities/OntologyVersion");
const DomainError_1 = require("../errors/DomainError");
class SchemaEvolutionService {
    evolve(ontology, newVersion) {
        if (newVersion <= ontology.version) {
            throw new DomainError_1.DomainError('New version must be greater than current version.');
        }
        // Logic to create a new OntologyVersion based on the current Ontology state
        return OntologyVersion_1.OntologyVersion.create({
            version: newVersion,
            isPublished: false,
            createdAt: new Date(),
        });
    }
}
exports.SchemaEvolutionService = SchemaEvolutionService;
//# sourceMappingURL=SchemaEvolutionService.js.map